/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { ProductServices } from "./product.service";

// create a product
const createAProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body.products;

    const result = await ProductServices.createProductIntoDb(product);
    res.status(200).json({
      message: "Bike created successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to created bike",
      status: false,
      error: error.message,
    });
  }
};

// get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDb();
    res.status(200).json({
      message: "All products get Successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to get all bike",
      status: false,
      error: error.message,
    });
  }
};

// get single products
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductServices.getSingleProductFromDb(productId);
    res.status(200).json({
      message: "Product gets Successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to get bike",
      status: false,
      error: error.message,
    });
  }
};

// delete single products
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const result = await ProductServices.deleteSingleProductFromDb(productId);
    res.status(200).json({
      message: "Product deleted Successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to deleted bike",
      status: false,
      error: error.message,
    });
  }
};

// update single products
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const updates = req.body;
    const result = await ProductServices.updateSingleProductFromDb(
      productId,
      updates,
    );

    res.status(200).json({
      message: "Product updated Successfully",
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to updated bike",
      status: false,
      error: error.message,
    });
  }
};

export const ProductControllers = {
  createAProduct,
  getAllProducts,
  getSingleProduct,
  deleteSingleProduct,
  updateSingleProduct,
};
