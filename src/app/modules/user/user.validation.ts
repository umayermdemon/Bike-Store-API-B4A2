import { z } from "zod";

const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  }),
});
const updateUserStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(["active", "deactivate"]),
  }),
});

export const userValidations = {
  registerUserValidationSchema,
  updateUserStatusValidationSchema,
};
