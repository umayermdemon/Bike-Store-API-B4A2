import express from "express";
import { ProductControllers } from "./product.controller";

const router = express.Router();

// create products
router.post("/", ProductControllers.createAProduct);

// get all products
router.get("/", ProductControllers.getAllProducts);

// get single product
router.get("/:productId", ProductControllers.getSingleProduct);

// update single product
router.put("/:productId", ProductControllers.updateSingleProduct);

// delete single product
router.delete("/:productId", ProductControllers.deleteSingleProduct);

export const ProductRoutes = router;
