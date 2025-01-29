import { z } from "zod";

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

export const authValidations = {
  loginUserValidationSchema,
};
