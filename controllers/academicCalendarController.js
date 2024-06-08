const AcademicCalendar = require('../models/AcademicCalendar');
const { upload, uploadImage } = require('../config/cloudinary');
// const multer = require('multer');
require("dotenv").config();
// Configure Multer to handle file uploads
// const uploadMiddleware = multer({ storage: multer.memoryStorage() }).single('file');

// Create a new academic calendar
exports.createAcademicCalendar = async (req, res) => {
        try {
            // Check if the file is present
            if (!req.files.pdfUrl) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            const uploadedFile = await uploadImage(req.files.pdfUrl,process.env.FOLDER_PDF);

            // Check if the programs field is present
            if (!req.body.programs) {
                return res.status(400).json({ message: 'Programs field is required' });
            }


            // Create the academic calendar entry
            const academicCalendar = new AcademicCalendar({
                programs: JSON.parse(req.body.programs),
                pdfUrl: uploadedFile.secure_url
            });

            await academicCalendar.save();

            res.status(201).json(academicCalendar);
        } catch (err) {
            res.status(400).json({ message: 'Error creating academic calendar: ' + err.message });
        }
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

        try {
            let updateData = {};
            
            if(req.files.pdfUrl){
                 const uploadedPdf = await uploadImage(req.files.pdfUrl.process.env.FOLDER_PDF);
                 updateData.pdfUrl = uploadedPdf.secure_url
            }

            // Check if the programs field is present
            if (req.body.programs) {
                updateData.programs = JSON.parse(req.body.programs);
            } else {
                return res.status(400).json({ message: 'Programs field is required' });
            }

            // Check if a file is uploaded and upload it to Cloudinary

            const academicCalendar = await AcademicCalendar.findByIdAndUpdate(req.params.id, updateData, { new: true });
            if (!academicCalendar) {
                return res.status(404).json({ message: 'Academic calendar not found' });
            }

            res.status(200).json(academicCalendar);
        } catch (err) {
            res.status(400).json({ message: 'Error updating academic calendar: ' + err.message });
        }
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
