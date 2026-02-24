const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/media', require('./routes/mediaRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes')); // ✅ Team management

const PORT = process.env.PORT || 5000;

// ✅ Store server reference so we can set a custom timeout
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ✅ 10 minutes — prevents large video uploads from being cut off mid-transfer
server.timeout = 600000;