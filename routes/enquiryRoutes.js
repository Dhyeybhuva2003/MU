// routes/enquiryRoutes.js

const express = require("express");
const router = express.Router();
const enquiryController = require("../controllers/enquiryController");

// Routes for enquiries
router.post("/", enquiryController.createEnquiry); // Create a new enquiry
router.get("/:id", enquiryController.getEnquiryById); // Retrieve a specific enquiry
router.get("/", enquiryController.getAllEnquiries); // Retrieve all enquiries
router.put("/:id", enquiryController.updateEnquiry); // Update a specific enquiry
router.delete("/:id", enquiryController.deleteEnquiry); // Delete a specific enquiry

module.exports = router;
