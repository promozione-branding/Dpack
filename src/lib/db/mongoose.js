import mongoose from "mongoose";
import dns from "node:dns";

const MONGODB_SECRET_URI = process.env.MONGODB_URI;
const MONGODB_DNS_SERVERS = (process.env.MONGODB_DNS_SERVERS || "")
  .split(",")
  .map((server) => server.trim())
  .filter(Boolean);

let cached = global._mongoose;
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!MONGODB_SECRET_URI) {
    throw new Error("MONGODB_URI is not configured. Set it in .env.local and restart the server.");
  }

  if (MONGODB_DNS_SERVERS.length > 0) {
    dns.setServers(MONGODB_DNS_SERVERS);
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_SECRET_URI, { bufferCommands: false })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}