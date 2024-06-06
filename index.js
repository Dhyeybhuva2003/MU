const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Add this line

const placementRecordRoutes = require('./routes/placementRecordRoutes');
const homeUpdateRoutes = require('./routes/homeUpdateRoutes');
const academicCalendarRoutes = require('./routes/academicCalendarRoutes');
const examScheduleRoutes = require('./routes/examScheduleRoutes');
const contactRoutes = require('./routes/contactRoutes');
const circularRoutes = require('./routes/circularRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: 'https://mu-l50w.onrender.com',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json());

// Connect to MongoDB using db.js
require('./config/db')();

// Routes
app.use('/home-updates', homeUpdateRoutes);
app.use('/placement-records', placementRecordRoutes);
app.use('/academic-calendars', academicCalendarRoutes);
app.use('/exam-schedules', examScheduleRoutes);
app.use('/contacts', contactRoutes);
app.use('/circulars', circularRoutes);
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 9001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
