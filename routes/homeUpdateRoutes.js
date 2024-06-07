const express = require('express');
const router = express.Router();
const homeUpdateController = require('../controllers/homeUpdateController');

// Define routes for handling home update requests

// Route to create a new home update
router.post('/', homeUpdateController.createHomeUpdate);

// Route to get all home updates
router.get('/', homeUpdateController.getHomeUpdates);

// Route to get a single home update by its ID
router.get('/:id', homeUpdateController.getHomeUpdateById);

// Route to update a home update by its ID
router.put('/:id', homeUpdateController.updateHomeUpdate);

// Route to delete a home update by its ID
router.delete('/:id', homeUpdateController.deleteHomeUpdate);

module.exports = router;
