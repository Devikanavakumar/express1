const mongoose = require('mongoose');

const mongoURL = 'mongodb://127.0.0.1:27017/shopifyDB';

mongoose.connect(mongoURL)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });