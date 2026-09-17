import mongoose from 'mongoose';

export async function connectDatabase() {
  if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI is not set; continuing without a database connection.');
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('MongoDB connected');
}
