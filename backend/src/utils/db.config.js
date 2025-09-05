import mongoose from "mongoose";
import { MONGO_URI, NODE_ENV } from "./env.js";

console.log("MONGO_URI:", MONGO_URI); // Debugging line to check if MONGO_URI is loaded

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables.");
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to MongoDB in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
};

export default connectToDatabase;
