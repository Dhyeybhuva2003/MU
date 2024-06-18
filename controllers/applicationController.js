const Application = require('../models/Application');
const { uploadImage } = require('../config/cloudinary');
require("dotenv").config();

// Create a new application
exports.createApplication = async (req, res) => {
    try {
        if (!req.files.resumeUrl) {
            return res.status(400).json({ message: 'Resume file is required' });
        }

        const uploadedFile = await uploadImage(req.files.resumeUrl, process.env.FOLDER_RESUMES);

        const applicationData = {
            ...req.body,
            resumeUrl: uploadedFile.secure_url
        };

        const application = new Application(applicationData);
        await application.save();

        res.status(201).json(application);
    } catch (err) {
        res.status(400).json({ message: 'Error creating application: ' + err.message });
    }
};

// Get all applications
exports.getApplications = async (req, res) => {
    try {
        const applications = await Application.find();
        res.status(200).json(applications);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching applications: ' + err.message });
    }
};

// Get a single application by its ID
exports.getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json(application);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching application: ' + err.message });
    }
};

// Update an application by its ID
exports.updateApplication = async (req, res) => {
    try {
        let updateData = { ...req.body };

        if (req.files?.resumeUrl) {
            const uploadedFile = await uploadImage(req.files.resumeUrl, process.env.FOLDER_RESUMES);
            updateData.resumeUrl = uploadedFile.secure_url;
        }

        const application = await Application.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json(application);
    } catch (err) {
        res.status(400).json({ message: 'Error updating application: ' + err.message });
    }
};

// Delete an application by its ID
exports.deleteApplication = async (req, res) => {
    try {
        const application = await Application.findByIdAndDelete(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json({ message: 'Application deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting application: ' + err.message });
    }
};
