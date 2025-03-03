
import mongoose from 'mongoose';

// MongoDB connection string
const MONGODB_URI = import.meta.env.VITE_MONGODB_URI || 'mongodb://localhost:27017/voting-app';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = { conn: null, promise: null };

// Initialize global mongoose in Node.js environment
if (typeof window === 'undefined' && !global.mongoose) {
  global.mongoose = { conn: null, promise: null };
  cached = global.mongoose;
}

async function connectToDatabase() {
  // When running in the browser, return a mock connection
  // This prevents client-side connection attempts
  if (typeof window !== 'undefined') {
    console.log('Running in browser - skipping actual MongoDB connection');
    return { connection: { isConnected: false } };
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;
