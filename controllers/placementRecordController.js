// project-root/controllers/placementRecordController.js

const PlacementRecord = require('../models/PlacementRecord');

// Controller functions to handle CRUD operations for placement records

// Create a new placement record
exports.createPlacementRecord = async (req, res) => {
    try {
        // Create a new placement record using the request body
        const placementRecord = await PlacementRecord.create(req.body);
        // Respond with the created placement record
        res.status(201).json(placementRecord);
    } catch (err) {
        // Handle error if unable to create placement record
        res.status(400).json({ message: err.message });
    }
};

// Get all placement records
exports.getPlacementRecords = async (req, res) => {
    try {
        // Find all placement records in the database
        const placementRecords = await PlacementRecord.find();
        // Respond with the list of placement records
        res.status(200).json(placementRecords);
    } catch (err) {
        // Handle error if unable to fetch placement records
        res.status(500).json({ message: err.message });
    }
};

// Get a single placement record by its ID
exports.getPlacementRecordById = async (req, res) => {
    try {
        // Find a placement record by its ID
        const placementRecord = await PlacementRecord.findById(req.params.id);
        // If placement record not found, respond with 404 Not Found
        if (!placementRecord) {
            return res.status(404).json({ message: 'Placement record not found' });
        }
        // Respond with the found placement record
        res.status(200).json(placementRecord);
    } catch (err) {
        // Handle error if unable to fetch placement record
        res.status(500).json({ message: err.message });
    }
};

// Update a placement record by its ID
exports.updatePlacementRecord = async (req, res) => {
    try {
        // Find and update a placement record by its ID
        const placementRecord = await PlacementRecord.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // If placement record not found, respond with 404 Not Found
        if (!placementRecord) {
            return res.status(404).json({ message: 'Placement record not found' });
        }
        // Respond with the updated placement record
        res.status(200).json(placementRecord);
    } catch (err) {
        // Handle error if unable to update placement record
        res.status(400).json({ message: err.message });
    }
};

// Delete a placement record by its ID
exports.deletePlacementRecord = async (req, res) => {
    try {
        // Find and delete a placement record by its ID
        const placementRecord = await PlacementRecord.findByIdAndDelete(req.params.id);
        // If placement record not found, respond with 404 Not Found
        if (!placementRecord) {
            return res.status(404).json({ message: 'Placement record not found' });
        }
        // Respond with success message
        res.status(200).json({ message: 'Placement record deleted successfully' });
    } catch (err) {
        // Handle error if unable to delete placement record
        res.status(500).json({ message: err.message });
    }
};
