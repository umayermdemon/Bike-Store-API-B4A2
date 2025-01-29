import { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { verifyToken } from "../modules/auth/auth.utils";
import catchAsync from "../utils/catchAsync";
import httpStatus from "http-status";
import { RegisteredUser } from "../modules/user/user.model";
import { TUerRole } from "../modules/user/user.interface";

const auth = (...requiredRoles: TUerRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }
    const decoded = verifyToken(token, config.access_token_secret as string);

    const { email, role } = decoded;
    const user = await RegisteredUser.findOne({ email });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
