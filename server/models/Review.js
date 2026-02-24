const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  rating:   { type: Number, required: true, min: 1, max: 5 },
  text:     { type: String, required: true },
  approved: { type: Boolean, default: false }, // admin approves before it shows on website
  createdAt:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);