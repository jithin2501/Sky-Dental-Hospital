// server/controllers/doctorController.js
const cloudinary = require('../config/cloudinary'); // ✅ centralized config
const Doctor = require('../models/Doctor');

const streamToCloudinary = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    stream.end(buffer);
  });
};

// GET all doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({ order: 1, createdAt: 1 });
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create doctor
exports.createDoctor = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No image uploaded' });

    const { name, specialty } = req.body;
    if (!name || !specialty) return res.status(400).json({ message: 'Name and specialty are required' });

    const result = await streamToCloudinary(file.buffer, {
      resource_type: 'image',
      folder: 'sky_dental_doctors',
    });

    const doctor = new Doctor({
      name,
      specialty,
      image_url: result.secure_url,
      image_public_id: result.public_id,
    });

    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    console.error('Create doctor error:', err);
    res.status(500).json({ message: err.message });
  }
};

// PUT update doctor
exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    const { name, specialty } = req.body;
    if (name) doctor.name = name;
    if (specialty) doctor.specialty = specialty;

    if (req.file) {
      try {
        await cloudinary.uploader.destroy(doctor.image_public_id, { resource_type: 'image' });
      } catch (e) {
        console.warn('Could not delete old image:', e.message);
      }

      const result = await streamToCloudinary(req.file.buffer, {
        resource_type: 'image',
        folder: 'sky_dental_doctors',
      });

      doctor.image_url = result.secure_url;
      doctor.image_public_id = result.public_id;
    }

    await doctor.save();
    res.status(200).json(doctor);
  } catch (err) {
    console.error('Update doctor error:', err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE doctor
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    try {
      await cloudinary.uploader.destroy(doctor.image_public_id, { resource_type: 'image' });
    } catch (e) {
      console.warn('Could not delete Cloudinary image:', e.message);
    }

    await Doctor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    console.error('Delete doctor error:', err);
    res.status(500).json({ message: err.message });
  }
};