import mongoose from "mongoose";

export type TOrder = {
  email: string;
  productId: mongoose.Types.ObjectId;
  quantity: number;
  totalPrice: number;
  status: "pending" | "paid" | "shipped" | "completed" | "canceled";
  shippingDetails: {
    customer_phone: string;
    customer_address: string;
    customer_country: string;
    customer_city: string;
  };
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    date_time: string;
    method: string;
    sp_messag: string;
  };
};
