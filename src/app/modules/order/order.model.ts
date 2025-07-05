import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>(
  {
    email: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "completed", "canceled", "failed"],
      default: "pending",
    },
    shippingDetails: {
      customer_phone: String,
      customer_address: String,
      customer_city: String,
      customer_country: String,
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      date_time: String,
      method: String,
      sp_message: String,
    },
  },
  { timestamps: true },
);

export const Order = model<TOrder>("Order", orderSchema);
