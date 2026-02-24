const mongoose = require('mongoose');

const DoctorProfileSchema = new mongoose.Schema({
  // Links to the Doctor card (one-to-one)
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
    unique: true
  },

  designation: { type: String, default: '' },
  experience:  { type: String, default: '' },
  bio1:        { type: String, default: '' },
  bio2:        { type: String, default: '' },
  email:       { type: String, default: '' },
  facebook:    { type: String, default: '' },
  instagram:   { type: String, default: '' },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DoctorProfile', DoctorProfileSchema);