const ideasRouter = require("express").Router();
const checkMillionDollarIdea = require("./checkMillionDollarIdea");

const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");

ideasRouter.param("id", (req, res, next, id) => {
  const idea = getFromDatabaseById("ideas", id );
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});

// GET /api/ideas to get an array of all ideas.
ideasRouter.get("/", (req, res) => {
  res.send(getAllFromDatabase("ideas"));
});

// POST /api/ideas to create a new idea and save it to the database.

ideasRouter.post("/", checkMillionDollarIdea, (req, res) => {
  const newIdea = addToDatabase("ideas", req.body);
  res.status(201).send(newIdea);
});

//GET /api/ideas/:ideaId to get a single idea by id.

ideasRouter.get("/:id", (req, res) => {
  res.send(req.idea);
});

//PUT /api/ideas/:ideaId to update a single idea by id.

ideasRouter.put("/:id", checkMillionDollarIdea, (req, res ) => {
  let updatedInstance = updateInstanceInDatabase("ideas", req.body);
  res.send(updatedInstance);
});

//DELETE /api/ideas/:ideaId to delete a single idea by id.

ideasRouter.delete("/:id", (req, res) => {
  const deleted = deleteFromDatabasebyId("ideas", req.params.id);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});

module.exports = ideasRouter;
