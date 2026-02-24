const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  url: { type: String, required: true },
  public_id: { type: String, required: true },
  resource_type: { type: String, required: true }, // 'video' or 'image'
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Media', MediaSchema);