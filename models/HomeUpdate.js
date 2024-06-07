// project-root/models/HomeUpdate.js

const mongoose = require('mongoose');

const homeUpdateSchema = new mongoose.Schema({
    image: String, // Assuming you store the image URL from Cloudinary
    title: String,
    description: String,
    position: String,
    location: String,
    qualification: String,
    offeredCTC: String,
    reportTo: String,
    jobDescription: String,
    candidateRequiredProfile: String,
    registrationLink: String,
    lastDate: Date
});

module.exports = mongoose.model('HomeUpdate', homeUpdateSchema);
