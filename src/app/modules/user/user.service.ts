import { TRegisterUser } from "./user.interface";
import { RegisteredUser } from "./user.model";

const registerUserIntoDb = async (payload: TRegisterUser) => {
  const result = await RegisteredUser.create(payload);
  return result;
};

export const AuthServices = { registerUserIntoDb };
