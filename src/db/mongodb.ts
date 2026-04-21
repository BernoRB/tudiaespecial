import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/tudiaespecial";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not set");
}

export const connectDB = async (): Promise<void> => {
  try {
    console.log('=== MONGODB CONNECTION DEBUG ===');
    console.log('Connecting to URI:', MONGODB_URI);
    console.log('================================');
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully");
    console.log('Database name:', mongoose.connection.name);
    console.log('================================');
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("MongoDB disconnection error:", error);
  }
};

export default mongoose;
