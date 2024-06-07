const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const placementRecordRoutes = require('./routes/placementRecordRoutes');
const homeUpdateRoutes = require('./routes/homeUpdateRoutes');
const academicCalendarRoutes = require('./routes/academicCalendarRoutes');
const examScheduleRoutes = require('./routes/examScheduleRoutes');
const contactRoutes = require('./routes/contactRoutes');
const circularRoutes = require('./routes/circularRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || /http:\/\/localhost:\d+$/.test(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));

// // Increase the payload size limit
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));

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
