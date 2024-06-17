const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventController");

// Route for creating a new event
router.post("/", eventsController.createEvent);

// Route for getting all events
router.get("/", eventsController.getAllEvents);

// Route for getting a single event by ID
router.get("/:id", eventsController.getEventById);

// Route for updating an event by ID
router.put("/:id", eventsController.updateEvent);

// Route for deleting an event by ID
router.delete("/:id", eventsController.deleteEvent);

module.exports = router;
