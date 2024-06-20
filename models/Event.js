const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventImages: {
        type: [String], // Store URLs of the images in Cloudinary
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
