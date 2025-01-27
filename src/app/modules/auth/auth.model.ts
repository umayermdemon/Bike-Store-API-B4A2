import { model, Schema } from "mongoose";
import { TRegisterUser } from "./auth.interface";

const registrationSchema = new Schema<TRegisterUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "customer" },
  },
  {
    timestamps: true,
  },
);

export const Register = model<TRegisterUser>("Register", registrationSchema);
