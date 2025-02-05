/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { productSearchableFields } from "./product.const";

// create a product
const createProductIntoDb = async (file: any, payload: TProduct) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // create a user[transaction-1]

    const imageName = payload.name;
    const { secure_url }: any = await sendImageToCloudinary(
      file?.path,
      imageName,
    );
    const quantity = payload?.quantity;
    if (quantity <= 0) {
      payload.inStock = false;
    }
    payload.productImage = secure_url;
    const priceInBDT = payload.price * 110;
    payload.price = priceInBDT;

    // create a student [transaction-2]
    const newProduct = await Product.create([payload], { session });
    if (!newProduct.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create product");
    }
    await session.commitTransaction();
    await session.endSession();
    return newProduct;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err);
  }
};

// get all product
const getAllProductsFromDb = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(productSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await productQuery.queryModel;
  const meta = await productQuery.countTotal();
  return {
    result,
    meta,
  };
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
