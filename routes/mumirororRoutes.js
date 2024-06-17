const express = require('express');
const router = express.Router();
const mumirororController = require('../controllers/mumirororController');

// Route to create a new mumiroror
router.post('/', mumirororController.createMumiroror);

// Route to get all mumirorors
router.get('/', mumirororController.getMumirorors);

// Route to get a single mumiroror by its ID
router.get('/:id', mumirororController.getMumirororById);

// Route to update a mumiroror by its ID
router.put('/:id', mumirororController.updateMumiroror);

// Route to delete a mumiroror by its ID
router.delete('/:id', mumirororController.deleteMumiroror);

module.exports = router;
