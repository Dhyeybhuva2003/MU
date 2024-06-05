// project-root/app.js

const express = require('express');
const mongoose = require('mongoose');
const placementRecordRoutes = require('./routes/placementRecordRoutes');
const homeUpdateRoutes = require('./routes/homeUpdateRoutes');
const academicCalendarRoutes = require('./routes/academicCalendarRoutes');
const examScheduleRoutes = require('./routes/examScheduleRoutes');
const contactRoutes = require('./routes/contactRoutes');
const circularRoutes = require('./routes/circularRoutes');
const authRoutes = require('./routes/authRoutes'); 

const app = express();

// Connect to MongoDB using db.js
require('./config/db')();

// Middleware
app.use(express.json());

// Routes
app.use('/home-updates', homeUpdateRoutes);
app.use('/placement-records', placementRecordRoutes);
app.use('/academic-calendars', academicCalendarRoutes);
app.use('/exam-schedules', examScheduleRoutes);
app.use('/contacts', contactRoutes);
app.use('/circulars', circularRoutes);
app.use('/auth', authRoutes);  // Add this line

// Start the server
const PORT = process.env.PORT || 9001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
