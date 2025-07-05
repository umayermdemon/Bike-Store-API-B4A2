import { OrderServices } from "./order.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

// create a order
const createOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.createOrderIntoDb(
    req.body,
    req.ip!,
    req?.user,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Order created successfully",
    data: result,
  });
});
// get all order
const getAllOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOrderFromDb();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Order are retrieved successfully",
    data: result,
  });
});
// get  order by email
const getAllOrderByEmail = catchAsync(async (req, res) => {
  const email = req.params.email;
  const result = await OrderServices.getAllOrderByEmailFromDb(email);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Order are retrieved successfully",
    data: result,
  });
});
// Verify Payment
const verifyPayment = catchAsync(async (req, res) => {
  const result = await OrderServices.verifyPayment(
    req.query.order_id as string,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payment verified",
    data: result,
  });
});

// calculate revenue
const calculateRevenue = catchAsync(async (req, res) => {
  const totalRevenue = await OrderServices.calculateRevenueFromOrder();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Revenue calculated successfully",
    data: { totalRevenue },
  });
});
export const OrderControllers = {
  createOrder,
  calculateRevenue,
  verifyPayment,
  getAllOrder,
  getAllOrderByEmail,
};
