/* eslint-disable @typescript-eslint/no-explicit-any */
import { TRegisterUser } from "./user.interface";
import { RegisteredUser } from "./user.model";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const registerUserIntoDb = async (file: any, payload: TRegisterUser) => {
  const imageName = `${payload.name}'s photo`;
  const path = file?.path;
  const { secure_url }: any = await sendImageToCloudinary(path, imageName);
  payload.userImage = secure_url;
  const newUser = await RegisteredUser.create(payload);
  if (!newUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
  }
  return newUser;
};
const getUserFromDb = async (email: string) => {
  const result = await RegisteredUser.findOne({ email: email });
  return result;
};

export const UserServices = { registerUserIntoDb, getUserFromDb };
