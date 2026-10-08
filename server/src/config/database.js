import mongoose from 'mongoose';

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('USERNAME:PASSWORD')) {
    console.warn('⚠️ MONGODB_URI is not configured or using default placeholders. Database will run in development mode.');
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.warn(`⚠️ MongoDB connection attempt failed (${error.message}). Continuing with in-memory store.`);
  }
}
