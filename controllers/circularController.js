// project-root/controllers/circularController.js

const Circular = require('../models/Circular');
const { upload } = require('../config/cloudinary');

// Controller functions to handle CRUD operations for circulars

// Create a new circular
exports.createCircular = async (req, res) => {
    try {
        const result = await upload(req.file.path); // Upload document to Cloudinary
        const circular = new Circular({
            name: req.body.name,
            documentUrl: result.secure_url,
            uploadDate: req.body.uploadDate
        });
        await circular.save();
        res.status(201).json(circular);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all circulars
exports.getCirculars = async (req, res) => {
    try {
        const circulars = await Circular.find();
        res.status(200).json(circulars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single circular by its ID
exports.getCircularById = async (req, res) => {
    try {
        const circular = await Circular.findById(req.params.id);
        if (!circular) {
            return res.status(404).json({ message: 'Circular not found' });
        }
        res.status(200).json(circular);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a circular by its ID
exports.updateCircular = async (req, res) => {
    try {
        let updateData = { name: req.body.name, uploadDate: req.body.uploadDate };
        if (req.file) {
            const result = await upload(req.file.path); // Upload new document to Cloudinary
            updateData.documentUrl = result.secure_url;
        }
        const circular = await Circular.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!circular) {
            return res.status(404).json({ message: 'Circular not found' });
        }
        res.status(200).json(circular);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a circular by its ID
exports.deleteCircular = async (req, res) => {
    try {
        const circular = await Circular.findByIdAndDelete(req.params.id);
        if (!circular) {
            return res.status(404).json({ message: 'Circular not found' });
        }
        res.status(200).json({ message: 'Circular deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
