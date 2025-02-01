import { z } from "zod";

const createProductValidationSchema = z.object({
  body: z.object({
    product: z.object({
      name: z.string(),
      brand: z.string(),
      price: z.number(),
      category: z.enum(["Mountain", "Road", "Hybrid", "Electric"]),
      description: z.string(),
      quantity: z.number(),
      inStock: z.boolean().optional(),
    }),
  }),
});

export const productValidations = { createProductValidationSchema };
