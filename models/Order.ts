import mongoose, { Schema, models, model } from "mongoose";

const ItemSchema = new Schema({
  id: { type: String, required: true },         // productId
  name: String,
  price: Number,
  qty: Number,
  image: String,
  variant: String,
}, 
{ _id: false }
);

const OrderSchema = new Schema({
  orderNumber: { type: String, index: true },   // opcional: para numeración
  items: { type: [ItemSchema], required: true },
  currency: { type: String, default: "USD" },
  totals: {
    subtotal: Number,
    shipping: Number,
    total: Number,
  },
  customer: {
    name: String,
    email: String,
    phone: String,
    documentId: String,
    address: String,
  },
  payment: {
    method: String,      // ZELLE / PAGOMOVIL / EFECTIVO / TRANSFER / STRIPE
    reference: String,   // último 4, ref, etc.
    status: { type: String, default: "pending" }, // pending/paid/failed
  },
  notes: String,
  status: { type: String, default: "new" }, // new/processing/shipped/cancelled
}, { timestamps: true });

export type OrderDoc = mongoose.InferSchemaType<typeof OrderSchema>;
export default models.Order || model("Order", OrderSchema);
