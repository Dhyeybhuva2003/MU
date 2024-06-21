// controllers/enquiryController.js

const Enquiry = require("../models/Enquiry");

// Create operation: POST /api/enquiry
const createEnquiry = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      state,
      city,
      graduation,
      programs,
      specialization,
    } = req.body;

    const enquiry = new Enquiry({
      name,
      email,
      phone,
      state,
      city,
      graduation,
      programs,
      specialization,
    });

    const savedEnquiry = await enquiry.save();
    res.status(201).json(savedEnquiry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Read operation: GET /api/enquiry/:id
const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ error: "Enquiry not found" });
    }
    res.json(enquiry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Read operation: GET /api/enquiry
const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find();
    res.json(enquiries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update operation: PUT /api/enquiry/:id
const updateEnquiry = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      state,
      city,
      graduation,
      programs,
      specialization,
    } = req.body;

    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ error: "Enquiry not found" });
    }

    enquiry.name = name;
    enquiry.email = email;
    enquiry.phone = phone;
    enquiry.state = state;
    enquiry.city = city;
    enquiry.graduation = graduation;
    enquiry.programs = programs;
    enquiry.specialization = specialization;

    const updatedEnquiry = await enquiry.save();
    res.json(updatedEnquiry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete operation: DELETE /api/enquiry/:id
const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ error: "Enquiry not found" });
    }

    res.json({ message: "Enquiry deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createEnquiry,
  getEnquiryById,
  getAllEnquiries,
  updateEnquiry,
  deleteEnquiry,
};
