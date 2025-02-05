import { z } from "zod";

const createOrderValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    productId: z.string(),
    quantity: z.number(),
    totalPrice: z.number(),
    shippingDetails: z.object({
      customer_phone: z.string().regex(/^\d{10,15}$/, "Invalid phone number"),
      customer_country: z.string().min(1, "Country name is required"),
      customer_city: z.string().min(1, "City is required"),
      customer_address: z.string().min(1, "Address is required"),
    }),
  }),
});

export const orderValidations = {
  createOrderValidationSchema,
};
