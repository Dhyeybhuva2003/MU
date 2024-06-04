// project-root/models/AcademicCalendar.js

const mongoose = require('mongoose');

const academicCalendarSchema = new mongoose.Schema({
    programs: String, // Array of strings to store selection of programs
    pdfUrl: String // URL of the PDF stored in Cloudinary
});

module.exports = mongoose.model('AcademicCalendar', academicCalendarSchema);
