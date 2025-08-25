import mongoose from "mongoose";

// Type for global mongoose cache
interface MongooseGlobal {
  mongoose?: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Extend globalThis with our type
declare const global: typeof globalThis & MongooseGlobal;

const MONGO_URI = process.env.MONGO_URI as string;
if (!MONGO_URI) throw new Error("MONGO_URI environment variable is not set");

// Initialize cached object
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (global.mongoose && global.mongoose.conn) return global.mongoose.conn;

  if (global.mongoose && !global.mongoose.promise) {
    global.mongoose.promise = mongoose
      .connect(MONGO_URI)
      .then((mongoose) => mongoose);
  }

  if (!global.mongoose) {
    throw new Error("global.mongoose is not initialized");
  }
  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn;
}
