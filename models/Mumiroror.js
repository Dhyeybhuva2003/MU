const mongoose = require('mongoose');

const mumirrorSchema = new mongoose.Schema({
    images: [String], // Array to store image URLs from Cloudinary
    year: String, // Format should be '2016-2017'
});

module.exports = mongoose.model('Mumirror', mumirrorSchema);
