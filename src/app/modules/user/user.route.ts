import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserControllers } from "./user.controller";
import { upload } from "../../utils/sendImageToCloudinary";
import { userValidations } from "./user.validation";

const router = Router();

router.post(
  "/register",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(userValidations.registerUserValidationSchema),
  UserControllers.registerUser,
);
router.get("/", UserControllers.getAllUser);
router.get("/:email", UserControllers.getUser);
router.patch(
  "/:id",
  // auth("Admin"),
  validateRequest(userValidations.updateUserStatusValidationSchema),
  UserControllers.updateUser,
);

export const UserRoutes = router;
