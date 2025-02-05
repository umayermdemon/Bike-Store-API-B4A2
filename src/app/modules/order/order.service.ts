import AppError from "../../errors/AppError";
import { Product } from "../product/product.model";
import { Order } from "./order.model";
import httpStatus from "http-status";
import { paymentDetails } from "./order.utils";
import mongoose from "mongoose";

// create a order
const createOrderIntoDb = async (
  payload: any,
  client_ip: string,
  user: any,
) => {
  const { email, productId, quantity, shippingDetails } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const product = await Product.findById(productId).session(session);
    if (user?.role === "Admin") {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `${user?.role} can't place order`,
      );
    }

    if (!product) {
      throw new AppError(httpStatus.NOT_FOUND, "Product not found");
    }

    if (product.quantity < quantity) {
      throw new AppError(httpStatus.CONFLICT, "Insufficient stock available");
    }

    const totalPrice = product?.price * quantity;

    // Create order
    let order: any = await Order.create(
      [
        {
          email,
          productId,
          quantity,
          totalPrice,
        },
      ],
      { session },
    );
    if (!order.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create order");
    }
    order = order[0];

    const paymentPayload = {
      amount: totalPrice,
      order_id: user?._id,
      currency: "BDT",
      customer_name: user?.name,
      customer_address: shippingDetails?.customer_address,
      customer_email: user?.email,
      customer_phone: shippingDetails?.customer_phone,
      customer_city: shippingDetails?.customer_city,
      customer_country: shippingDetails?.customer_country,
      client_ip,
    };

    const payment = await paymentDetails.makePaymentAsync(paymentPayload);
    if (payment?.transactionStatus) {
      order = await Order.findOneAndUpdate(
        {
          _id: order._id,
        },
        {
          transaction: {
            id: payment.sp_order_id,
            transactionStatus: payment.transactionStatus,
          },
        },
        {
          new: true,
          session,
        },
      );
    }
    await session.commitTransaction();
    await session.endSession();

    return payment.checkout_url;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    console.log(error);
  }
};
const verifyPayment = async (order_id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const verifiedPayment = await paymentDetails.verifyPaymentAsync(order_id);
    if (verifiedPayment.length) {
      const paymentStatus = verifiedPayment[0].bank_status;
      const order = await Order.findOneAndUpdate(
        {
          "transaction.id": order_id,
        },
        {
          "transaction.transactionStatus":
            verifiedPayment[0].transaction_status,
          "transaction.bank_status": verifiedPayment[0].bank_status,
          "transaction.sp_code": verifiedPayment[0].sp_code,
          " transaction.date_time": verifiedPayment[0].date_time,
          "transaction.method": verifiedPayment[0].method,
          "transaction.sp_message": verifiedPayment[0].sp_message,
          status:
            paymentStatus === "Success"
              ? "paid"
              : paymentStatus === "Failed"
                ? "pending"
                : paymentStatus === "Cancel"
                  ? "canceled"
                  : "",
        },
        {
          new: true,
          session,
        },
      );
      if (order && paymentStatus === "Success") {
        const product = await Product.findById(order.productId).session(
          session,
        );
        if (!product) {
          throw new AppError(httpStatus.NOT_FOUND, "Product not found!");
        }
        if (!product) {
          throw new AppError(httpStatus.NOT_FOUND, "Product not found");
        }

        if (product.quantity === undefined) {
          throw new AppError(
            httpStatus.CONFLICT,
            "Product quantity is undefined",
          );
        }
        if (product?.quantity < order?.quantity) {
          throw new AppError(
            httpStatus.CONFLICT,
            "Insufficient stock available",
          );
        }
        product.quantity -= order.quantity;
        if (product.quantity <= 0) {
          product.inStock = false;
        }

        await product.save({ session });
      }
    }
    await session.commitTransaction();
    await session.endSession();
    return verifiedPayment;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    console.log(error);
  }
};
// get orders
const getAllOrderFromDb = async () => {
  const result = await Order.find();
  return result;
};
// calculate revenue
const calculateRevenueFromOrder = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: { $multiply: ["$quantity", "$totalPrice"] } },
      },
    },
  ]);

  //   return result[0]?.totalRevenue || 0;
  return result[0]?.totalRevenue || 0;
};
export const OrderServices = {
  createOrderIntoDb,
  calculateRevenueFromOrder,
  verifyPayment,
  getAllOrderFromDb,
};
