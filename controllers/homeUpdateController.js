// project-root/controllers/homeUpdateController.js

const HomeUpdate = require('../models/HomeUpdate');

// Controller functions to handle CRUD operations for home updates

// Create a new home update
exports.createHomeUpdate = async (req, res) => {
    try {
        // Create a new home update using the request body
        const homeUpdate = await HomeUpdate.create(req.body);
        // Respond with the created home update
        res.status(201).json(homeUpdate);
    } catch (err) {
        // Handle error if unable to create home update
        res.status(400).json({ message: err.message });
    }
};

// Get all home updates
exports.getHomeUpdates = async (req, res) => {
    try {
        // Find all home updates in the database
        const homeUpdates = await HomeUpdate.find();
        // Respond with the list of home updates
        res.status(200).json(homeUpdates);
    } catch (err) {
        // Handle error if unable to fetch home updates
        res.status(500).json({ message: err.message });
    }
};

// Get a single home update by its ID
exports.getHomeUpdateById = async (req, res) => {
    try {
        // Find a home update by its ID
        const homeUpdate = await HomeUpdate.findById(req.params.id);
        // If home update not found, respond with 404 Not Found
        if (!homeUpdate) {
            return res.status(404).json({ message: 'Home update not found' });
        }
        // Respond with the found home update
        res.status(200).json(homeUpdate);
    } catch (err) {
        // Handle error if unable to fetch home update
        res.status(500).json({ message: err.message });
    }
};

// Update a home update by its ID
exports.updateHomeUpdate = async (req, res) => {
    try {
        // Find and update a home update by its ID
        const homeUpdate = await HomeUpdate.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // If home update not found, respond with 404 Not Found
        if (!homeUpdate) {
            return res.status(404).json({ message: 'Home update not found' });
        }
        // Respond with the updated home update
        res.status(200).json(homeUpdate);
    } catch (err) {
        // Handle error if unable to update home update
        res.status(400).json({ message: err.message });
    }
};

// Delete a home update by its ID
exports.deleteHomeUpdate = async (req, res) => {
    try {
        // Find and delete a home update by its ID
        const homeUpdate = await HomeUpdate.findByIdAndDelete(req.params.id);
        // If home update not found, respond with 404 Not Found
        if (!homeUpdate) {
            return res.status(404).json({ message: 'Home update not found' });
        }
        // Respond with success message
        res.status(200).json({ message: 'Home update deleted successfully' });
    } catch (err) {
        // Handle error if unable to delete home update
        res.status(500).json({ message: err.message });
    }
};
