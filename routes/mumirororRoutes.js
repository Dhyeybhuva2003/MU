const express = require('express');
const router = express.Router();
const mumirrorController = require('../controllers/mumirororController');

// Define routes for handling mumirror requests

// Route to create a new mumirror entry
router.post('/', mumirrorController.createMumirror);

// Route to get all mumirror entries
router.get('/', mumirrorController.getMumirrors);

// Route to get a single mumirror entry by its ID
router.get('/:id', mumirrorController.getMumirrorById);

// Route to update a mumirror entry by its ID
router.put('/:id', mumirrorController.updateMumirror);

// Route to delete a mumirror entry by its ID
router.delete('/:id', mumirrorController.deleteMumirror);

module.exports = router;
