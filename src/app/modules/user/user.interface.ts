import { User_Role } from "./user.const";

export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
  role: "Customer" | "Admin";
  userImage?: string;
  status: "active" | "deactivate";
};
export type TUerRole = keyof typeof User_Role;
