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
  } catch (err) {
    console.log(err);
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
  } catch (err) {
    console.log(err);
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
  } catch (err) {
    console.log(err);
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
  } catch (err) {
    console.log(err);
  }
};
export const ProductControllers = {
  createAProduct,
  getAllProducts,
  getSingleProduct,
  deleteSingleProduct,
};
