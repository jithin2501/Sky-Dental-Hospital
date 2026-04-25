const cloudinary = require('../config/cloudinary');
const GallerySection = require('../models/GallerySection');

const streamToCloudinary = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    stream.end(buffer);
  });
};

// Get all gallery sections
exports.getGallery = async (req, res) => {
  try {
    const sections = await GallerySection.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json(sections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new section
exports.createSection = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const newSection = new GallerySection({ title, items: [] });
    await newSection.save();
    res.status(201).json(newSection);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update section title
exports.updateSection = async (req, res) => {
  try {
    const { title } = req.body;
    const section = await GallerySection.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );
    if (!section) return res.status(404).json({ message: "Section not found" });
    res.status(200).json(section);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete section and all its items
exports.deleteSection = async (req, res) => {
  try {
    const section = await GallerySection.findById(req.params.id);
    if (!section) return res.status(404).json({ message: "Section not found" });

    // Delete all items from Cloudinary
    for (const item of section.items) {
      if (item.public_id) {
        try {
          await cloudinary.uploader.destroy(item.public_id, {
            resource_type: item.resource_type
          });
        } catch (err) {
          console.error('Error deleting from cloudinary:', err);
        }
      }
    }

    await GallerySection.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Section deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add item to section
exports.addItem = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const section = await GallerySection.findById(sectionId);
    if (!section) return res.status(404).json({ message: "Section not found" });

    const resourceType = file.mimetype.startsWith('video') ? 'video' : 'image';

    const result = await streamToCloudinary(file.buffer, {
      resource_type: resourceType,
      folder: 'sky_dental_gallery',
    });

    const newItem = {
      url: result.secure_url,
      public_id: result.public_id,
      resource_type: resourceType
    };

    section.items.push(newItem);
    await section.save();

    res.status(201).json(section);
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: err.message });
  }
};

// Delete item from section
exports.deleteItem = async (req, res) => {
  try {
    const { sectionId, itemId } = req.params;
    const section = await GallerySection.findById(sectionId);
    if (!section) return res.status(404).json({ message: "Section not found" });

    const itemIndex = section.items.findIndex(i => i._id.toString() === itemId);
    if (itemIndex === -1) return res.status(404).json({ message: "Item not found" });

    const item = section.items[itemIndex];

    // Delete from Cloudinary
    if (item.public_id) {
      try {
        await cloudinary.uploader.destroy(item.public_id, {
          resource_type: item.resource_type
        });
      } catch (err) {
        console.error('Error deleting from cloudinary:', err);
      }
    }

    section.items.splice(itemIndex, 1);
    await section.save();

    res.status(200).json(section);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
