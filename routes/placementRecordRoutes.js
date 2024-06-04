// project-root/routes/placementRecordRoutes.js

const express = require('express');
const router = express.Router();
const placementRecordController = require('../controllers/placementRecordController');

// Define routes for handling placement record requests

// Route to create a new placement record
router.post('/', placementRecordController.createPlacementRecord);

// Route to get all placement records
router.get('/', placementRecordController.getPlacementRecords);

// Route to get a single placement record by its ID
router.get('/:id', placementRecordController.getPlacementRecordById);

// Route to update a placement record by its ID
router.put('/:id', placementRecordController.updatePlacementRecord);

// Route to delete a placement record by its ID
router.delete('/:id', placementRecordController.deletePlacementRecord);

module.exports = router;
