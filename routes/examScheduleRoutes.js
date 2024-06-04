// project-root/routes/examScheduleRoutes.js

const express = require('express');
const router = express.Router();
const examScheduleController = require('../controllers/examScheduleController');
const { upload } = require('../config/cloudinary');

// Define routes for handling exam schedule requests

// Route to create a new exam schedule
router.post('/', upload.single('document'), examScheduleController.createExamSchedule);

// Route to get all exam schedules
router.get('/', examScheduleController.getExamSchedules);

// Route to get a single exam schedule by its ID
router.get('/:id', examScheduleController.getExamScheduleById);

// Route to update an exam schedule by its ID
router.put('/:id', upload.single('document'), examScheduleController.updateExamSchedule);

// Route to delete an exam schedule by its ID
router.delete('/:id', examScheduleController.deleteExamSchedule);

module.exports = router;
