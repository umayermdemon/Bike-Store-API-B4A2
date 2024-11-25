import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDb = async (product: TProduct) => {
  const result = Product.create(product);
  return result;
};

export const ProductServices = {
  createProductIntoDb,
};
