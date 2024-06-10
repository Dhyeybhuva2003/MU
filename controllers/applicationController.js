const Application = require('../models/Application');
const { upload, uploadImage } = require('../config/cloudinary');
require("dotenv").config();

// Create a new application
exports.createApplication = async (req, res) => {
    try {
        if (!req.files.resume) {
            return res.status(400).json({ message: 'No resume uploaded' });
        }

        const uploadedFile = await uploadImage(req.files.resume,process.env.FOLDER_PDF);

        const application = new Application({
            fullName: req.body.fullName,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            category: req.body.category,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            postalCode: req.body.postalCode,
            country: req.body.country,
            phone: req.body.phone,
            email: req.body.email,
            positionApplyFor: req.body.positionApplyFor,
            faculty: req.body.faculty,
            tenthPercentage: req.body.tenthPercentage,
            twelfthPercentage: req.body.twelfthPercentage,
            ugDegree: req.body.ugDegree,
            ugUniversityName: req.body.ugUniversityName,
            ugCGPA: req.body.ugCGPA,
            ugYearOfPassing: req.body.ugYearOfPassing,
            pgDegree: req.body.pgDegree,
            pgUniversityName: req.body.pgUniversityName,
            pgCGPA: req.body.pgCGPA,
            pgYearOfPassing: req.body.pgYearOfPassing,
            phdDegree: req.body.phdDegree,
            phdUniversityName: req.body.phdUniversityName,
            phdCGPA: req.body.phdCGPA,
            phdYearOfPassing: req.body.phdYearOfPassing,
            resumeUrl: uploadedFile.secure_url,
            academicExperience: req.body.academicExperience,
            industryExperience: req.body.industryExperience,
            researchExperience: req.body.researchExperience,
            totalExperience: req.body.totalExperience,
            canJoinImmediately: req.body.canJoinImmediately,
            noticePeriod: req.body.noticePeriod,
            alternateMobileNo: req.body.alternateMobileNo,
            alternateEmail: req.body.alternateEmail
        });

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
        let updateData = {};

        if (req.files?.resume) {
            const uploadedResume = await uploadImage(req.files.resume, process.env.FOLDER_RESUME);
            updateData.resumeUrl = uploadedResume.secure_url;
        }

        for (const key in req.body) {
            if (req.body[key]) {
                updateData[key] = req.body[key];
            }
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
