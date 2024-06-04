// project-root/models/ExamSchedule.js

const mongoose = require('mongoose');

const examScheduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    documentUrl: { type: String, required: true }, // URL of the document stored in Cloudinary
    uploadDate: { type: Date, default: Date.now } // Date the document was uploaded
});

module.exports = mongoose.model('ExamSchedule', examScheduleSchema);
