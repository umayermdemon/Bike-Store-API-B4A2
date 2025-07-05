import express from "express";
import { OrderControllers } from "./order.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { orderValidations } from "./order.validation";

const router = express.Router();

// create order
router.post(
  "/",
  auth("Customer"),
  validateRequest(orderValidations.createOrderValidationSchema),
  OrderControllers.createOrder,
);

// get all order
router.get("/", OrderControllers.getAllOrder);
// get all order
router.get("/customer/:email", OrderControllers.getAllOrderByEmail);
// verify payment
router.get("/verify", OrderControllers.verifyPayment);
// get revenue
router.get("/revenue", OrderControllers.calculateRevenue);

export const OrderRoutes = router;
