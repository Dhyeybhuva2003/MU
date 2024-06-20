// controllers/eventsController.js

const { uploadImage } = require('../config/cloudinary');
const Event = require('../models/Event');
require("dotenv").config();

// Create a new event
exports.createEvent = async (req, res) => {
    try {
        if (!req.files || !req.files.eventImages || !Array.isArray(req.files.eventImages)) {
            return res.status(400).json({ message: "Event images are required" });
        }

        const images = req.files.eventImages;
        const uploadedImages = await Promise.all(images.map(image => uploadImage(image, process.env.EVENT_IMAGE_FOLDER)));

        const newEvent = new Event({
            eventImages: uploadedImages.map(img => img.secure_url),
            title: req.body.title,
            description: req.body.description
        });

        const savedEvent = await newEvent.save();

        res.status(201).json(savedEvent);
    } catch (err) {
        console.error("Error creating event:", err);
        res.status(500).json({ message: "Failed to create event", error: err.message });
    }
};


// Get all events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        console.error("Error fetching events:", err);
        res.status(500).json({ message: "Failed to fetch events", error: err.message });
    }
};

// Get a single event by ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.json(event);
    } catch (err) {
        console.error("Error fetching event by ID:", err);
        res.status(500).json({ message: "Failed to fetch event", error: err.message });
    }
};

// Update an event by ID
exports.updateEvent = async (req, res) => {
    try {
        let updatedData = req.body;

        if (req.files && req.files.eventImages && Array.isArray(req.files.eventImages)) {
            const images = req.files.eventImages;
            const uploadedImages = await Promise.all(images.map(image => uploadImage(image, process.env.EVENT_IMAGE_FOLDER)));
            updatedData.eventImages = uploadedImages.map(img => img.secure_url);
        }

        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updatedData, {
            new: true,
            runValidators: true
        });

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.json(updatedEvent);
    } catch (err) {
        console.error("Error updating event:", err);
        res.status(500).json({ message: "Failed to update event", error: err.message });
    }
};


// Delete an event by ID
exports.deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);

        if (!deletedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.json({ message: "Event deleted successfully", deletedEvent });
    } catch (err) {
        console.error("Error deleting event:", err);
        res.status(500).json({ message: "Failed to delete event", error: err.message });
    }
};

