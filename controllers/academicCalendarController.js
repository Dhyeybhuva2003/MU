const AcademicCalendar = require('../models/AcademicCalendar');
const { upload } = require('../config/cloudinary');
const multer = require('multer');

// Configure Multer to handle file uploads
const uploadMiddleware = multer({ storage: multer.memoryStorage() }).single('file');

// Create a new academic calendar
exports.createAcademicCalendar = async (req, res) => {
    uploadMiddleware(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'File upload error: ' + err.message });
        }

        try {
            // Check if the file is present
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            // Check if the programs field is present
            if (!req.body.programs) {
                return res.status(400).json({ message: 'Programs field is required' });
            }

            // Upload the file to Cloudinary
            const result = await upload(req.file.buffer);

            // Create the academic calendar entry
            const academicCalendar = new AcademicCalendar({
                programs: JSON.parse(req.body.programs),
                pdfUrl: result.secure_url
            });

            await academicCalendar.save();
            res.status(201).json(academicCalendar);
        } catch (err) {
            res.status(400).json({ message: 'Error creating academic calendar: ' + err.message });
        }
    });
};

// Get all academic calendars
exports.getAcademicCalendars = async (req, res) => {
    try {
        const academicCalendars = await AcademicCalendar.find();
        res.status(200).json(academicCalendars);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching academic calendars: ' + err.message });
    }
};

// Get a single academic calendar by its ID
exports.getAcademicCalendarById = async (req, res) => {
    try {
        const academicCalendar = await AcademicCalendar.findById(req.params.id);
        if (!academicCalendar) {
            return res.status(404).json({ message: 'Academic calendar not found' });
        }
        res.status(200).json(academicCalendar);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching academic calendar: ' + err.message });
    }
};

// Update an academic calendar by its ID
exports.updateAcademicCalendar = async (req, res) => {
    uploadMiddleware(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'File upload error: ' + err.message });
        }

        try {
            let updateData = {};
            
            // Check if the programs field is present
            if (req.body.programs) {
                updateData.programs = JSON.parse(req.body.programs);
            } else {
                return res.status(400).json({ message: 'Programs field is required' });
            }

            // Check if a file is uploaded and upload it to Cloudinary
            if (req.file) {
                const result = await upload(req.file.buffer);
                updateData.pdfUrl = result.secure_url;
            }

            const academicCalendar = await AcademicCalendar.findByIdAndUpdate(req.params.id, updateData, { new: true });
            if (!academicCalendar) {
                return res.status(404).json({ message: 'Academic calendar not found' });
            }

            res.status(200).json(academicCalendar);
        } catch (err) {
            res.status(400).json({ message: 'Error updating academic calendar: ' + err.message });
        }
    });
};

// Delete an academic calendar by its ID
exports.deleteAcademicCalendar = async (req, res) => {
    try {
        const academicCalendar = await AcademicCalendar.findByIdAndDelete(req.params.id);
        if (!academicCalendar) {
            return res.status(404).json({ message: 'Academic calendar not found' });
        }
        res.status(200).json({ message: 'Academic calendar deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting academic calendar: ' + err.message });
    }
};
