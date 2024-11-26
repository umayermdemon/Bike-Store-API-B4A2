import { Product } from "../product/product.model";
import { Order } from "./order.model";

// create a order
const createOrderIntoDb = async (
  email: string,
  productId: string,
  quantity: number,
  totalPrice: number,
) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.quantity < quantity) {
    throw new Error("Insufficient stock available");
  }

  const productQuantity = product.quantity;
  // Update product
  product.quantity = productQuantity - quantity;
  if (productQuantity === 0) {
    product.inStock = false;
  }
  await product.save();

  // Create order
  const order = await Order.create({
    email,
    product: productId,
    quantity,
    totalPrice,
  });

  return order;
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
};
