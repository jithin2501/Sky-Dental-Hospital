const User = require('../models/User');

// Fetch all regular admins for the User Management table
exports.getUsers = async (req, res) => {
  try {
    // Only fetch users with the 'Admin' role to avoid listing Superadmins from DB
    const users = await User.find({ role: 'Admin' });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new admin user
exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new User({ 
      username, 
      password, // Plain text for now as per your setup
      role: 'Admin',
      status: 'Active',
      lastLogin: new Date()
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an admin user by ID
exports.deleteUser = async (req, res) => {
  try {
    // Prevent the deletion logic from hanging if ID is missing
    if (!req.params.id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login logic for database-stored admins
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find the user by username
    const user = await User.findOne({ username });

    // Validate existence and password
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Check if the account has been deactivated by Superadmin
    if (user.status === 'Inactive') {
      return res.status(403).json({ message: "Account deactivated. Contact Superadmin." });
    }

    // Update the lastLogin timestamp in the database
    user.lastLogin = new Date();
    await user.save();

    // Send back relevant info for frontend localStorage
    res.status(200).json({ 
      username: user.username, 
      role: user.role 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};