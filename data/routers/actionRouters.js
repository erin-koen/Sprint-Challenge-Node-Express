const express = require("express");
const Actions = require("../helpers/actionModel.js");
const Projects = require("../helpers/projectModel.js");

const router = express.Router();

//Get a list of all actions
router.get("/", async (req, res) => {
  try {
    const actionList = await Actions.get();
    res.status(200).json(actionList);
  } catch (err) {
    res
      .status(500)
      .json({ message: "There was an eror retrieving all actions." });
  }
});

//Get a list of actions by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const action = await Actions.get(id);
    res.status(200).json(action);
  } catch (err) {
    res.status(404).send("An action with that ID does not exist");
  }
});

//Create a new action. Requires an object with project_id: string, description: string, and notes: string
router.post("/", async (req, res) => {
  const { project_id, description, notes } = req.body;
  if (project_id && description && notes) {
    try {
      const projectExists = await Projects.get(project_id);
      if (projectExists) {
        try {
          const newAction = await Actions.insert(req.body);
          res.status(200).json(newAction);
        } catch (err) {
          res.status(500).console.log("The action was not able to be created");
        }
      }
    } catch (err) {
      res.status(404).send("No such project exists, go make a project first.");
    }
  }
  res
    .status(400)
    .send("An action requires a valid project_id, description, and notes.");
});

//Update an action
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { project_id, description, notes } = req.body;
  if (project_id || description || notes) {
    try {
      const test = await Actions.get(id);
      if (test) {
        try {
          const udpatedAction = await Actions.update(id, req.body);
          res.status(200).json(udpatedAction);
        } catch (err) {
          res.status(500).send("The action could not be updated.");
        }
      } else {
        res.status(404).send("An action with that ID does not exist");
      }
    } catch (err) {
      res.status(404).send("An action with that ID does not exist");
    }
  } else {
    res
      .status(400)
      .send(
        "An action update requires a valid project_id, description, or notes."
      );
  }
});

// Delete an action
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const test = await Actions.get(id);
    if (test) {
      try {
        await Actions.remove(id);
        res.status(200).send("The action was deleted successfully");
      } catch (err) {
        res.status(500).send("The action could not be updated.");
      }
    } else {
      res.status(404).send("An action with that ID does not exist");
    }
  } catch (err) {
    res.status(404).send("An action with that ID does not exist");
  }
});

module.exports = router;
