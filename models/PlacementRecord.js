// project-root/models/PlacementRecord.js

const mongoose = require('mongoose');

const placementRecordSchema = new mongoose.Schema({
    image: String, // URL of the image stored in Cloudinary
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

module.exports = mongoose.model('PlacementRecord', placementRecordSchema);
