import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  event_id?: mongoose.Types.ObjectId;
  customer_name?: string;
  customer_email: string;
  customer_whatsapp: string;
  category: string;
  template_key?: string;
  raw_form_json: object;
  payment_method?: string;
  amount?: number;
  status: string;
  created_at: Date;
  updated_at: Date;
}

const OrderSchema: Schema = new Schema({
  event_id: { type: Schema.Types.ObjectId, index: true },
  customer_name: { type: String },
  customer_email: { type: String, required: true },
  customer_whatsapp: { type: String, required: true },
  category: { type: String, required: true },
  template_key: { type: String },
  raw_form_json: { type: Object, required: true },
  payment_method: { type: String },
  amount: { type: Number },
  status: { type: String, required: true, default: "pending" },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model<IOrder>("Order", OrderSchema);
