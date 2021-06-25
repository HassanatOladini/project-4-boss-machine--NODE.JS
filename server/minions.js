const minionsRouter = require("express").Router();

// For all /api/minions and /api/ideas routes, any POST or PUT requests will send their new/updated resources in the request body.
//  POST request bodies will not have an id property, you will have to set it based on the next id in sequence.

const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");
//ERROR HERE NOW FIXED
minionsRouter.param("minionId", (req, res, next, id) => {
  const minion = getFromDatabaseById("minions", id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});
// GET /api/minions to get an array of all minions.
minionsRouter.get("/", (req, res) => {
  res.send(getAllFromDatabase("minions"));
});

// POST /api/minions to create a new minion and save it to the database.
minionsRouter.post("/", (req, res) => {
  const newMinion = addToDatabase("minions", req.body);
  res.status(201).send(newMinion);
});

// GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get("/:minionId", (req, res) => {
  res.send(req.minion);
});

//PUT
minionsRouter.put("/:minionId", (req, res) => {
  let updatedInstance = updateInstanceInDatabase("minions", req.body);
  res.send(updatedInstance);
});

// DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete("/:minionId", (req, res) => {
  const deleted = deleteFromDatabasebyId("minions", req.params.minionId);
  if (deleted === null) {
    res.status(500);
  } else if (deleted) {
    res.status(204);
  } else {
    res.status(404);
  }
  res.send();
});

module.exports = minionsRouter;
