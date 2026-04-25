const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema({
  url: { type: String, required: true },
  public_id: { type: String },
  resource_type: { type: String, enum: ['image', 'video'], required: true },
  createdAt: { type: Date, default: Date.now }
});

const gallerySectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  items: [galleryItemSchema],
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('GallerySection', gallerySectionSchema);
