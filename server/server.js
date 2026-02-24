const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB(); // Connect to MongoDB

app.use(cors());
app.use(express.json()); // Essential for reading req.body

// Registering Routes
app.use('/api/contact', require('./routes/contactRoutes'));
// This line MUST exist to handle admin logins
app.use('/api/users', require('./routes/userRoutes')); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));