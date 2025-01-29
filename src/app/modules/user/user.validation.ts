import { z } from "zod";

const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  }),
});

export const userValidations = { registerUserValidationSchema };
