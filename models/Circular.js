// project-root/models/Circular.js

const mongoose = require('mongoose');

const circularSchema = new mongoose.Schema({
    name: { type: String, required: true },
    documentUrl: { type: String, required: true }, // URL of the document stored in Cloudinary
    uploadDate: { type: Date, default: Date.now } // Date the document was uploaded
});

module.exports = mongoose.model('Circular', circularSchema);
