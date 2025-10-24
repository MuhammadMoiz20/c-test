const mongoose = require('mongoose');

async function connectDB(uri) {
  if (!uri) {
    throw new Error('Missing MONGODB_URI in environment');
  }
  
  mongoose.set('strictQuery', true);
  
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
  });
}

async function disconnectDB() {
  await mongoose.disconnect();
}

module.exports = { connectDB, disconnectDB };
