export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
  role: "customer" | "admin";
};
