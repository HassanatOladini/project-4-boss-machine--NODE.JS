const meetingsRouter = require("express").Router();

// For /api/meetings POST route, no request body is necessary, as meetings are generated automatically by the server upon request.
// Use the provided createMeeting function exported from db.js to create a new meeting object.

const {
  getAllFromDatabase,
  addToDatabase,
  deleteAllFromDatabase,
  createMeeting,
} = require("./db");

// GET /api/meetings to get an array of all meetings.
meetingsRouter.get("/", (req, res) => {
  res.send(getAllFromDatabase("meetings"));
});


meetingsRouter.post("/", (req, res) => {
  let newMeeting = addToDatabase("meetings", createMeeting());
  res.status(201).send(newMeeting);
});

// DELETE /api/meetings to delete all meetings from the database.
meetingsRouter.delete("/", (req, res) => {
  deleteAllFromDatabase("meetings");
  res.status(204).send();
});

module.exports = meetingsRouter;
