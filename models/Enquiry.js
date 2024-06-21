// models/Enquiry.js

const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  graduation: {
    type: String,
    required: true,
  },
  programs: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Enquiry", EnquirySchema);
