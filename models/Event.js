// models/Event.js

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventImage: {
        type: [String], // Store URL of the image in Cloudinary
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
