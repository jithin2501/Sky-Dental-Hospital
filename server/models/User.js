const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Superadmin', 'Admin'], default: 'Admin' },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  permissions: { type: [String], default: [] }, // Array of section keys an Admin can access
  lastLogin: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);