import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('CRITICAL: MONGODB_URI environment variable is not defined. Please add it to your Vercel Project Settings.');
  }
}

const connectionString = MONGODB_URI || 'mongodb://127.0.0.1:27017/hostel-management';

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    console.log('Connecting to MongoDB...');

    cached.promise = mongoose.connect(connectionString, opts).then((mongoose) => {
      console.log('SUCCESS: Connected to MongoDB!');
      return mongoose;
    }).catch(err => {
      console.error('CRITICAL: MongoDB Connection Error:', err.message);
      cached.promise = null;
      throw err;
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