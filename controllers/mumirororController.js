const { uploadImage } = require('../config/cloudinary');
const Mumirror = require('../models/Mumiroror');
require('dotenv').config();

// Controller functions to handle CRUD operations for mumirror

// Create a new mumirror entry
exports.createMumirror = async (req, res) => {
    try {
        const images = req.files?.images;
        let uploadedImages = [];
        
        if (images && images.length > 0) {
            for (const image of images) {
                if (image.mimetype !== 'image/jpeg') {
                    return res.status(400).json({
                        message: "Only JPG format is allowed"
                    });
                }
                const uploadedImage = await uploadImage(image, process.env.FOLDER_IMAGE);
                uploadedImages.push(uploadedImage.secure_url);
            }
        } else {
            return res.status(401).json({
                message: "Images not found"
            });
        }
        
        req.body.images = uploadedImages;
        // Create a new mumirror entry using the request body
        const mumirror = await Mumirror.create(req.body);
        // Respond with the created mumirror entry
        res.status(201).json(mumirror);
    } catch (err) {
        // Handle error if unable to create mumirror entry
        res.status(400).json({ message: err.message });
    }
};

// Get all mumirror entries
exports.getMumirrors = async (req, res) => {
    try {
        // Find all mumirror entries in the database
        const mumirrors = await Mumirror.find();
        // Respond with the list of mumirror entries
        res.status(200).json(mumirrors);
    } catch (err) {
        // Handle error if unable to fetch mumirror entries
        res.status(500).json({ message: err.message });
    }
};

// Get a single mumirror entry by its ID
exports.getMumirrorById = async (req, res) => {
    try {
        // Find a mumirror entry by its ID
        const mumirror = await Mumirror.findById(req.params.id);
        // If mumirror entry not found, respond with 404 Not Found
        if (!mumirror) {
            return res.status(404).json({ message: 'Mumirror entry not found' });
        }
        // Respond with the found mumirror entry
        res.status(200).json(mumirror);
    } catch (err) {
        // Handle error if unable to fetch mumirror entry
        res.status(500).json({ message: err.message });
    }
};

// Update a mumirror entry by its ID
exports.updateMumirror = async (req, res) => {
    try {
        let uploadedImages = [];
        
        if (req.files?.images) {
            const images = req.files.images;
            for (const image of images) {
                if (image.mimetype !== 'image/jpeg') {
                    return res.status(400).json({
                        message: "Only JPG format is allowed"
                    });
                }
                const uploadedImage = await uploadImage(image, process.env.FOLDER_IMAGE);
                uploadedImages.push(uploadedImage.secure_url);
            }
            req.body.images = uploadedImages;
        }
        
        // Find and update a mumirror entry by its ID
        const mumirror = await Mumirror.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // If mumirror entry not found, respond with 404 Not Found
        if (!mumirror) {
            return res.status(404).json({ message: 'Mumirror entry not found' });
        }
        // Respond with the updated mumirror entry
        res.status(200).json(mumirror);
    } catch (err) {
        // Handle error if unable to update mumirror entry
        res.status(400).json({ message: err.message });
    }
};

// Delete a mumirror entry by its ID
exports.deleteMumirror = async (req, res) => {
    try {
        // Find and delete a mumirror entry by its ID
        const mumirror = await Mumirror.findByIdAndDelete(req.params.id);
        // If mumirror entry not found, respond with 404 Not Found
        if (!mumirror) {
            return res.status(404).json({ message: 'Mumirror entry not found' });
        }
        // Respond with success message
        res.status(200).json({ message: 'Mumirror entry deleted successfully' });
    } catch (err) {
        // Handle error if unable to delete mumirror entry
        res.status(500).json({ message: err.message });
    }
};
