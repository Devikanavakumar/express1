const mongoose = require('mongoose');

const stuffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 50 }
  },
  { timestamps: true } // stores createdAt & updatedAt
);

module.exports = mongoose.model('Stuff', stuffSchema);