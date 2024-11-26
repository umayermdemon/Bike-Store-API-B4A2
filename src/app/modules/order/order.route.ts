import express from "express";
import { OrderControllers } from "./order.controller";

const router = express.Router();

// create order
router.post("/", OrderControllers.createOrder);

// get revenue
router.get("/revenue", OrderControllers.calculateRevenue);

export const OrderRoutes = router;
