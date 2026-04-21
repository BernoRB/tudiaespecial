import { connectDB } from "./mongodb";
import Event from "../models/Event";
import Rsvp from "../models/Rsvp";
import Order from "../models/Order";

// Connect to MongoDB on import
connectDB().catch(console.error);

export { Event, Rsvp, Order };
export default { Event, Rsvp, Order };
