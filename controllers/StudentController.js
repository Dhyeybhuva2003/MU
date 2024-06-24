const Student = require("../models/Student");

// Create operation: POST /api/students
const createStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      state,
      city,
      gender,
      qualification,
      courseInterestedIn,
    } = req.body;

    const student = new Student({
      name,
      email,
      phone,
      state,
      city,
      gender,
      qualification,
      courseInterestedIn,
    });

    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Read operation: GET /api/students/:id
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Read operation: GET /api/students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update operation: PUT /api/students/:id
const updateStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      state,
      city,
      gender,
      qualification,
      courseInterestedIn,
    } = req.body;

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    student.name = name;
    student.email = email;
    student.phone = phone;
    student.state = state;
    student.city = city;
    student.gender = gender;
    student.qualification = qualification;
    student.courseInterestedIn = courseInterestedIn;

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete operation: DELETE /api/students/:id
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createStudent,
  getStudentById,
  getAllStudents,
  updateStudent,
  deleteStudent,
};
