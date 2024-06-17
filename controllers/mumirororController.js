const Mumiroror = require('../models/Mumiroror');
const { uploadImage } = require('../config/cloudinary');
require("dotenv").config();

// Create a new mumiroror entry
exports.createMumiroror = async (req, res) => {
    try {
        // Check if the file is present
        if (!req.files || !req.files.pdf) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const uploadedFile = await uploadImage(req.files.pdf, process.env.FOLDER_PDF);

        // Check if the tital field is present
        if (!req.body.tital) {
            return res.status(400).json({ message: 'Tital field is required' });
        }

        // Create the mumiroror entry
        const mumiroror = new Mumiroror({
            pdf: uploadedFile.secure_url,
            tital: req.body.tital
        });

        await mumiroror.save();

        res.status(201).json(mumiroror);
    } catch (err) {
        res.status(400).json({ message: 'Error creating mumiroror: ' + err.message });
    }
};

// Get all mumirorors
exports.getMumirorors = async (req, res) => {
    try {
        const mumirorors = await Mumiroror.find();
        res.status(200).json(mumirorors);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching mumirorors: ' + err.message });
    }
};

// Get a single mumiroror by its ID
exports.getMumirororById = async (req, res) => {
    try {
        const mumiroror = await Mumiroror.findById(req.params.id);
        if (!mumiroror) {
            return res.status(404).json({ message: 'Mumiroror not found' });
        }
        res.status(200).json(mumiroror);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching mumiroror: ' + err.message });
    }
};

// Update a mumiroror by its ID
exports.updateMumiroror = async (req, res) => {
    try {
        let updateData = {};

        if (req.files && req.files.pdf) {
            const uploadedPdf = await uploadImage(req.files.pdf, process.env.FOLDER_PDF);
            updateData.pdf = uploadedPdf.secure_url;
        }

        // Check if the tital field is present
        if (req.body.tital) {
            updateData.tital = req.body.tital;
        } else {
            return res.status(400).json({ message: 'Tital field is required' });
        }

        const mumiroror = await Mumiroror.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!mumiroror) {
            return res.status(404).json({ message: 'Mumiroror not found' });
        }

        res.status(200).json(mumiroror);
    } catch (err) {
        res.status(400).json({ message: 'Error updating mumiroror: ' + err.message });
    }
};

// Delete a mumiroror by its ID
exports.deleteMumiroror = async (req, res) => {
    try {
        const mumiroror = await Mumiroror.findByIdAndDelete(req.params.id);
        if (!mumiroror) {
            return res.status(404).json({ message: 'Mumiroror not found' });
        }
        res.status(200).json({ message: 'Mumiroror deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting mumiroror: ' + err.message });
    }
};
