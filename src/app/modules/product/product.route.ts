import { NextFunction, Request, Response, Router } from "express";
import { ProductControllers } from "./product.controller";
import { upload } from "../../utils/sendImageToCloudinary";
import validateRequest from "../../middlewares/validateRequest";
import { productValidations } from "./product.validation";
import auth from "../../middlewares/auth";

const router = Router();

// create products
router.post(
  "/",
  auth("Admin"),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(productValidations.createProductValidationSchema),
  ProductControllers.createAProduct,
);

// get all products
router.get("/", ProductControllers.getAllProducts);

// get single product
router.get("/:productId", ProductControllers.getSingleProduct);

// update single product
router.put("/:productId", ProductControllers.updateSingleProduct);

// delete single product
router.delete("/:productId", ProductControllers.deleteSingleProduct);

export const ProductRoutes = router;
