import mongoose, { Document, Schema } from "mongoose";

export interface IRsvp extends Document {
  event_id: mongoose.Types.ObjectId;
  contact_name: string;
  people_count: number;
  people_names?: string;
  food_preferences?: string;
  song_suggestions?: string;
  comments?: string;
  status: string;
  created_at: Date;
}

const RsvpSchema: Schema = new Schema({
  event_id: { type: Schema.Types.ObjectId, required: true, index: true },
  contact_name: { type: String, required: true },
  people_count: { type: Number, required: true },
  people_names: { type: String },
  food_preferences: { type: String },
  song_suggestions: { type: String },
  comments: { type: String },
  status: { type: String, required: true, default: "confirmed" },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model<IRsvp>("Rsvp", RsvpSchema);
