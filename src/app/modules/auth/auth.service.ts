import { RegisteredUser } from "../user/user.model";
import { TLogin } from "./auth.interface";

const loginUser = async (payload: TLogin) => {
  const result = await RegisteredUser.create(payload);
  return result;
};

export const AuthServices = { loginUser };
