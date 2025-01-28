import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { authValidations } from "./user.validation";
import { AuthControllers } from "./user.controller";
import { upload } from "../../utils/sendImageToCloudinary";

const router = Router();

router.post(
  "/register",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(authValidations.registerUserValidationSchema),
  AuthControllers.registerUser,
);

export const UserRoutes = router;
