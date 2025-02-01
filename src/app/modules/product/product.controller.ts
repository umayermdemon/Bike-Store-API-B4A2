import { ProductServices } from "./product.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

// create a product
const createAProduct = catchAsync(async (req, res) => {
  const product = req.body.product;
  const result = await ProductServices.createProductIntoDb(req?.file, product);
  sendResponse(res, {
    statusCode: 200,
    message: "Bike created successfully",
    success: true,
    data: result,
  });
});
// get all products
const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductsFromDb(req?.query);
  console.log(result);
  const data = result.result;
  const meta = result.meta;
  sendResponse(res, {
    statusCode: 200,
    message: "Products are retrieved Successfully",
    success: true,
    meta: meta,
    data: data,
  });
});

// get single products
const getSingleProduct = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const result = await ProductServices.getSingleProductFromDb(productId);
  sendResponse(res, {
    statusCode: 200,
    message: "Product is retrieved Successfully",
    success: true,
    data: result,
  });
});

// delete single products
const deleteSingleProduct = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const result = await ProductServices.deleteSingleProductFromDb(productId);
  sendResponse(res, {
    statusCode: 200,
    message: "Product deleted Successfully",
    success: true,
    data: result,
  });
});

// update single products
const updateSingleProduct = catchAsync(async (req, res) => {
  const productId = req.params.productId;
  const updates = req.body;
  const result = await ProductServices.updateSingleProductFromDb(
    productId,
    updates,
  );
  sendResponse(res, {
    statusCode: 200,
    message: "Product updated Successfully",
    success: true,
    data: result,
  });
});

export const ProductControllers = {
  createAProduct,
  getAllProducts,
  getSingleProduct,
  deleteSingleProduct,
  updateSingleProduct,
};
