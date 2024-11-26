import mongoose from "mongoose";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

// create a product
const createProductIntoDb = async (product: TProduct) => {
  const result = Product.create(product);
  return result;
};

// get all product
const getAllProductsFromDb = async () => {
  const result = await Product.find();
  return result;
};

// get single product
const getSingleProductFromDb = async (productId: string) => {
  const result = await Product.findOne({
    _id: new mongoose.Types.ObjectId(productId),
  });
  return result;
};

export const ProductServices = {
  createProductIntoDb,
  getAllProductsFromDb,
  getSingleProductFromDb,
};
