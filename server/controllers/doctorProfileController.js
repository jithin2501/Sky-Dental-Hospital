const DoctorProfile = require('../models/DoctorProfile');
const Doctor        = require('../models/Doctor');

// GET profile by doctor id
exports.getProfile = async (req, res) => {
  try {
    const profile = await DoctorProfile.findOne({ doctor: req.params.doctorId }).populate('doctor');
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET all profiles (with doctor info populated)
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await DoctorProfile.find().populate('doctor');
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST or PUT — upsert profile for a doctor
// If a profile already exists for this doctor it gets updated, otherwise created
exports.upsertProfile = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // Make sure the doctor actually exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

    const { designation, experience, bio1, bio2, email, facebook, instagram } = req.body;

    const profile = await DoctorProfile.findOneAndUpdate(
      { doctor: doctorId },
      { designation, experience, bio1, bio2, email, facebook, instagram },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(profile);
  } catch (err) {
    console.error('Upsert profile error:', err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE profile by doctor id
exports.deleteProfile = async (req, res) => {
  try {
    const profile = await DoctorProfile.findOneAndDelete({ doctor: req.params.doctorId });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};