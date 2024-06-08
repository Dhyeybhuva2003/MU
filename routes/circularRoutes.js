// project-root/routes/circularRoutes.js

const express = require('express');
const router = express.Router();
const circularController = require('../controllers/circularController');

// Define routes for handling circular requests

// Route to create a new circular
router.post('/', circularController.createCircular);

// Route to get all circulars
router.get('/', circularController.getCirculars);

// Route to get a single circular by its ID
router.get('/:id', circularController.getCircularById);

// Route to update a circular by its ID
router.put('/:id', circularController.updateCircular);

// Route to delete a circular by its ID
router.delete('/:id', circularController.deleteCircular);

module.exports = router;
