// project-root/routes/academicCalendarRoutes.js

const express = require('express');
const router = express.Router();
const academicCalendarController = require('../controllers/academicCalendarController');

// Route to create a new academic calendar
router.post('/', academicCalendarController.createAcademicCalendar);

// Route to get all academic calendars
router.get('/', academicCalendarController.getAcademicCalendars);

// Route to get a single academic calendar by its ID
router.get('/:id', academicCalendarController.getAcademicCalendarById);

// Route to update an academic calendar by its ID
router.put('/:id', academicCalendarController.updateAcademicCalendar);

// Route to delete an academic calendar by its ID
router.delete('/:id', academicCalendarController.deleteAcademicCalendar);

module.exports = router;
