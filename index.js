const express = require('express');
const cors = require('cors');
const placementRecordRoutes = require('./routes/placementRecordRoutes');
const homeUpdateRoutes = require('./routes/homeUpdateRoutes');
const academicCalendarRoutes = require('./routes/academicCalendarRoutes');
const examScheduleRoutes = require('./routes/examScheduleRoutes');
const contactRoutes = require('./routes/contactRoutes');
const circularRoutes = require('./routes/circularRoutes');
const authRoutes = require('./routes/authRoutes');
const { connectCloudinary } = require('./config/cloudinary');
const expressFileUploder = require("express-fileupload");

const app = express();

// Express built-in body parser without size limits
app.use(express.json()); // No size limit specified
app.use(express.urlencoded({ extended: true })); // No size limit specified
// CORS Middleware allowing requests from all origins
app.use(cors());
app.use(
    expressFileUploder({
      useTempFiles: true,
      tempFileDir: "/tmp",
    }));

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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 9001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;

connectCloudinary();