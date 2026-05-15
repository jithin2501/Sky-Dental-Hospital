const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ─── Helper ────────────────────────────────────────────────────────────────────
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
};

// ─── Login ─────────────────────────────────────────────────────────────────────
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const trimmedUsername = username.trim();

    // ── Step 1: Check Superadmin from .env ───────────────────────────────────
    const superUser = process.env.SUPERADMIN_USERNAME || process.env.REACT_APP_ADMIN_USERNAME;
    const superPass = process.env.SUPERADMIN_PASSWORD || process.env.REACT_APP_ADMIN_PASSWORD;

    if (superUser && superPass && trimmedUsername === superUser && password === superPass) {
      const token = generateToken({ id: 'superadmin', username: superUser, role: 'Superadmin' });
      return res.status(200).json({
        token,
        user: { id: 'superadmin', username: superUser, role: 'Superadmin', permissions: ['*'] }
      });
    }

    // ── Step 2: Check Database for regular Admins ─────────────────────────────
    const user = await User.findOne({ username: trimmedUsername });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.status === 'Inactive') {
      return res.status(403).json({ message: 'Account is deactivated. Contact your Superadmin.' });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken({ id: user._id, username: user.username, role: user.role });

    res.status(200).json({
      token,
      user: { id: user._id, username: user.username, role: user.role, permissions: user.permissions }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: err.message });
  }
};

// ─── Get All Admin Users ────────────────────────────────────────────────────────
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'Admin' }).select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── Create User — Superadmin only ─────────────────────────────────────────────
exports.createUser = async (req, res) => {
  try {
    // Only Superadmin can create users
    if (req.user.role !== 'Superadmin') {
      return res.status(403).json({ message: 'Only Superadmin can create users.' });
    }

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }
    
    const trimmedUsername = username.trim();

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters.' });
    }

    const existingUser = await User.findOne({ username: trimmedUsername });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username: trimmedUsername, password: hashedPassword, role: 'Admin', status: 'Active' });
    await newUser.save();

    const { password: _, ...userWithoutPassword } = newUser.toObject();
    res.status(201).json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── Toggle Active/Inactive — Superadmin only ──────────────────────────────────
exports.toggleStatus = async (req, res) => {
  try {
    if (req.user.role !== 'Superadmin') {
      return res.status(403).json({ message: 'Only Superadmin can change user status.' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.status = user.status === 'Active' ? 'Inactive' : 'Active';
    await user.save();

    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(200).json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── Delete User — Superadmin only ─────────────────────────────────────────────
exports.deleteUser = async (req, res) => {
  try {
    if (req.user.role !== 'Superadmin') {
      return res.status(403).json({ message: 'Only Superadmin can delete users.' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── Update Permissions — Superadmin only ──────────────────────────────────
exports.updatePermissions = async (req, res) => {
  try {
    if (req.user.role !== 'Superadmin') {
      return res.status(403).json({ message: 'Only Superadmin can update permissions.' });
    }

    const { permissions } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.permissions = permissions;
    await user.save();

    res.status(200).json({ message: 'Permissions updated successfully', permissions: user.permissions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};