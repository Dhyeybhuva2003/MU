const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

// Route to create a new application
router.post('/', applicationController.createApplication);

// Route to get all applications
router.get('/', applicationController.getApplications);

// Route to get a single application by its ID
router.get('/:id', applicationController.getApplicationById);

// Route to update an application by its ID
router.put('/:id', applicationController.updateApplication);

// Route to delete an application by its ID
router.delete('/:id', applicationController.deleteApplication);

module.exports = router;
