import AppError from "../../errors/AppError";
import { RegisteredUser } from "../user/user.model";
import { TLogin } from "./auth.interface";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import config from "../../config";
import { createToken } from "./auth.utils";

const loginUser = async (payload: TLogin) => {
  const user = await RegisteredUser.findOne({ email: payload?.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const passwordMatched = await bcrypt.compare(
    payload.password,
    user?.password,
  );
  if (!passwordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password don't matched");
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  // create access token
  const accessToken = createToken(
    jwtPayload,
    config.access_token_secret as string,
    config.access_token_expires_in as string,
  );
  // create refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.refresh_token_secret as string,
    config.refresh_token_expires_in as string,
  );
  return { accessToken, refreshToken };
};

export const AuthServices = { loginUser };
