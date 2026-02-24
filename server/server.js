const express = require('express');
const cors    = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/contact',         require('./routes/contactRoutes'));
app.use('/api/users',           require('./routes/userRoutes'));
app.use('/api/media',           require('./routes/mediaRoutes'));
app.use('/api/doctors',         require('./routes/doctorRoutes'));         // Team grid cards
app.use('/api/doctor-profiles', require('./routes/doctorProfileRoutes')); // Team profile details

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
server.timeout = 600000; // 10 min for large uploads