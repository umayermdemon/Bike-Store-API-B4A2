import { TRegisterUser } from "./auth.interface";
import { Register } from "./auth.model";

const registerUserIntoDb = async (payload: TRegisterUser) => {
  const result = await Register.create(payload);
  return result;
};

export const AuthServices = { registerUserIntoDb };
