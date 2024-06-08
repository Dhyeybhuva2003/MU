// project-root/controllers/examScheduleController.js

const ExamSchedule = require('../models/ExamSchedule');
const { upload, uploadImage } = require('../config/cloudinary');
require("dotenv").config();
// Controller functions to handle CRUD operations for exam schedules

// Create a new exam schedule
exports.createExamSchedule = async (req, res) => {
    try {
        const file = req.files.documentUrl;

        if(!file){
            return res.status(401).json({
                message:"pdf file not found"
            })
        }

        const uploadedFile = await uploadImage(file,process.env.FOLDER_PDF)

        const examSchedule = new ExamSchedule({
            title: req.body.title,
            documentUrl: uploadedFile.secure_url,
            uploadDate: req.body.uploadDate
        });

        await examSchedule.save();
        res.status(201).json(examSchedule);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all exam schedules
exports.getExamSchedules = async (req, res) => {
    try {
        const examSchedules = await ExamSchedule.find();
        res.status(200).json(examSchedules);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single exam schedule by its ID
exports.getExamScheduleById = async (req, res) => {
    try {
        const examSchedule = await ExamSchedule.findById(req.params.id);
        if (!examSchedule) {
            return res.status(404).json({ message: 'Exam schedule not found' });
        }
        res.status(200).json(examSchedule);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update an exam schedule by its ID
exports.updateExamSchedule = async (req, res) => {
    try {

        const file = req.files?.documentUrl

        let updateData = { title: req.body.title, uploadDate: req.body.uploadDate };
        
        if (file) {
            const result = await uploadImage(file,process.env.FOLDER_PDF); // Upload new document to Cloudinary
            updateData.documentUrl = result.secure_url;
        }
        const examSchedule = await ExamSchedule.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!examSchedule) {
            return res.status(404).json({ message: 'Exam schedule not found' });
        }
        res.status(200).json(examSchedule);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete an exam schedule by its ID
exports.deleteExamSchedule = async (req, res) => {
    try {
        const examSchedule = await ExamSchedule.findByIdAndDelete(req.params.id);
        if (!examSchedule) {
            return res.status(404).json({ message: 'Exam schedule not found' });
        }
        res.status(200).json({ message: 'Exam schedule deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
