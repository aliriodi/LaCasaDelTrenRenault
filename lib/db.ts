import mongoose from "mongoose";

let isConnected = false;

export async function dbConnect() {
  if (isConnected) return;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Falta MONGODB_URI");
  await mongoose.connect(uri);
  isConnected = true;
}
