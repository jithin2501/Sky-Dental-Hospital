const cloudinary = require('cloudinary').v2;
const Media = require('../models/Media');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Helper: stream buffer to Cloudinary
const streamToCloudinary = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    stream.end(buffer);
  });
};

// 1. Upload Media
exports.uploadMedia = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const resourceType = file.mimetype.startsWith('video') ? 'video' : 'image';

    // Upload to Cloudinary using buffer (memoryStorage)
    const result = await streamToCloudinary(file.buffer, {
      resource_type: resourceType,
      folder: 'sky_dental_media',
    });

    // Delete old media from Cloudinary + DB before saving new one
    const existing = await Media.findOne().sort({ uploadedAt: -1 });
    if (existing) {
      try {
        await cloudinary.uploader.destroy(existing.public_id, {
          resource_type: existing.resource_type,
        });
      } catch (destroyErr) {
        console.warn('Could not delete old Cloudinary asset:', destroyErr.message);
      }
      await Media.findByIdAndDelete(existing._id);
    }

    const newMedia = new Media({
      url: result.secure_url,
      public_id: result.public_id,
      resource_type: resourceType,
    });

    await newMedia.save();
    res.status(201).json(newMedia);
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: err.message });
  }
};

// 2. Get Latest Media
exports.getLatestMedia = async (req, res) => {
  try {
    const media = await Media.findOne().sort({ uploadedAt: -1 });
    if (!media) return res.status(404).json({ message: 'No media found' });
    res.status(200).json(media);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. Delete Media
exports.deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ message: 'Media not found' });

    await cloudinary.uploader.destroy(media.public_id, {
      resource_type: media.resource_type,
    });

    await Media.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: err.message });
  }
};