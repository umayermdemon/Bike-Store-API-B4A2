/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { OrderServices } from "./order.service";

// create a order
const createOrder = async (req: Request, res: Response) => {
  try {
    const { email, product, quantity, totalPrice } = req.body;

    const result = await OrderServices.createOrderIntoDb(
      email,
      product,
      quantity,
      totalPrice,
    );

    res.status(200).json({
      message: "Order created successfully",
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to place order",
      status: false,
      error: error.message,
    });
  }
};

// calculate revenue
const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await OrderServices.calculateRevenueFromOrder();

    res.status(200).json({
      message: "Revenue calculated successfully",
      status: true,
      data: { totalRevenue },
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to calculate revenue",
      status: false,
      error: error.message,
    });
  }
};
export const OrderControllers = {
  createOrder,
  calculateRevenue,
};
