import { User_Role } from "./user.const";

export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
  userImage?: string;
};
export type TUerRole = keyof typeof User_Role;
