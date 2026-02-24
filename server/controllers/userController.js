const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'Admin' });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "Username exists" });

    const newUser = new User({ username, password, role: 'Admin', status: 'Active' });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.toggleStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.status = user.status === 'Active' ? 'Inactive' : 'Active';
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || user.password !== password) return res.status(401).json({ message: "Invalid credentials" });
    
    if (user.status === 'Inactive') return res.status(403).json({ message: "Account deactivated." });

    user.lastLogin = new Date();
    await user.save();
    res.status(200).json({ username: user.username, role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};