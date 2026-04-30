import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  slug: string;
  category: string;
  template_key: string;
  title?: string;
  honorees?: string;
  event_type?: string;
  date?: string;
  time?: string;
  venue_name?: string;
  venue_address?: string;
  maps_url?: string;
  dress_code?: string;
  hero_message?: string;
  quote_message?: string;
  hero_image?: string;
  contact_email?: string;
  contact_whatsapp?: string;
  admin_pin: string;
  status: string;
  sections?: {
    countdown?: boolean;
    gallery?: boolean;
    gallery2?: boolean;
    location?: boolean;
    itinerary?: boolean;
    trivia?: boolean;
    dress_code?: boolean;
    gifts?: boolean;
    rsvp?: boolean;
  };
  sections_json?: string;
  gallery?: string[];
  itinerary?: any;
  ceremonies?: any;
  gallery2?: any;
  gift_alias?: string;
  gift_cbu?: string;
  gift_holder?: string;
  gift_message?: string;
  age_years?: number;
  reserved_color?: string;
  reserved_message?: string;
  client_original_data?: object;
  created_at: Date;
  updated_at: Date;
}

const EventSchema: Schema = new Schema({
  slug: { type: String, required: true, unique: true, index: true },
  category: { type: String, required: true },
  template_key: { type: String, required: true },
  title: { type: String },
  honorees: { type: String },
  event_type: { type: String },
  date: { type: String },
  time: { type: String },
  venue_name: { type: String },
  venue_address: { type: String },
  maps_url: { type: String },
  dress_code: { type: String },
  hero_message: { type: String },
  quote_message: { type: String },
  hero_image: { type: String },
  contact_email: { type: String },
  contact_whatsapp: { type: String },
  admin_pin: { type: String, required: true },
  status: { type: String, required: true, default: "pending_payment" },
  sections: {
    countdown: { type: Boolean },
    gallery: { type: Boolean },
    gallery2: { type: Boolean },
    location: { type: Boolean },
    itinerary: { type: Boolean },
    trivia: { type: Boolean },
    dress_code: { type: Boolean },
    gifts: { type: Boolean },
    rsvp: { type: Boolean },
  },
  sections_json: { type: String },
  gallery: [String],
  itinerary: Schema.Types.Mixed,
  ceremonies: Schema.Types.Mixed,
  gallery2: Schema.Types.Mixed,
  gift_alias: { type: String },
  gift_cbu: { type: String },
  gift_holder: { type: String },
  gift_message: { type: String },
  age_years: { type: Number },
  reserved_color: { type: String },
  reserved_message: { type: String },
  client_original_data: { type: Object },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model<IEvent>("Event", EventSchema);
