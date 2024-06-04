// project-root/routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Define routes for handling contact inquiries

// Route to create a new contact inquiry
router.post('/', contactController.createContact);

// Route to get all contact inquiries
router.get('/', contactController.getContacts);

// Route to get a single contact inquiry by its ID
router.get('/:id', contactController.getContactById);

// Route to update a contact inquiry by its ID
router.put('/:id', contactController.updateContact);

// Route to delete a contact inquiry by its ID
router.delete('/:id', contactController.deleteContact);

module.exports = router;
