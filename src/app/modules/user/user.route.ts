import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { authValidations } from "./user.validation";
import { AuthControllers } from "./user.controller";

const router = Router();

router.post(
  "/register",
  validateRequest(authValidations.registerUserValidationSchema),
  AuthControllers.registerUser,
);

export const UserRoutes = router;
