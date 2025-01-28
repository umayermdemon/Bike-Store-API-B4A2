import { model, Schema } from "mongoose";
import { TRegisterUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

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

// hashed password
registrationSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

registrationSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const RegisteredUser = model<TRegisterUser>(
  "RegisteredUser",
  registrationSchema,
);
