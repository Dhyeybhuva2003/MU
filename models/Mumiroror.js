const mongoose = require('mongoose');

const mumirororSchema = new mongoose.Schema({
    pdf: String, // URL of the PDF stored in Cloudinary
    tital: String // Title of the entry
});

module.exports = mongoose.model('Mumiroror', mumirororSchema);
