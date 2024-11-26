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

// delete single product
const deleteSingleProductFromDb = async (productId: string) => {
  const result = await Product.deleteOne({ _id: productId });
  return result;
};

// update single product
const updateSingleProductFromDb = async (
  productId: string,
  updates: Partial<typeof Product>,
) => {
  const result = await Product.updateOne({ _id: productId }, updates, {
    runValidators: true,
  });
  if (result.modifiedCount === 0) {
    throw new Error("Product not found or no changes made");
  }

  const updatedResult = await Product.findById(productId);

  return updatedResult;
};

export const ProductServices = {
  createProductIntoDb,
  getAllProductsFromDb,
  getSingleProductFromDb,
  deleteSingleProductFromDb,
  updateSingleProductFromDb,
};
