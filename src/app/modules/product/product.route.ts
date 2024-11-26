import express from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

// create products
router.post("/", ProductControllers.createAProduct);

// get all products
router.get("/", ProductControllers.getAllProducts);

// get delete products
router.get("/:productId", ProductControllers.getSingleProduct);

// delete single products
router.delete("/:productId", ProductControllers.deleteSingleProduct);

export const ProductRoutes = router;
