import { Request, Response } from "express";
import { ProductServices } from "./product.service";

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

export const ProductControllers = {
  createAProduct,
};
