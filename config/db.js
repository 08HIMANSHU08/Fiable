const mongoose = require('mongoose');
const logger = require('../utils/logger')
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    logger.info('MongoDB connected successfully');
  } catch (error) {
   logger.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
