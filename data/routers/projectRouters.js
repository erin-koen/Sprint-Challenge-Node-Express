const express = require("express");
const Projects = require("../helpers/projectModel.js");

const router = express.Router();

//Get a list of all projects
router.get("/", async (req, res) => {
  try {
    const projectList = await Projects.get();
    res.status(200).json(projectList);
  } catch (err) {
    res.status(500).send("There was an error retrieving all projects.");
  }
});

//Get a list of projects by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Projects.get(id);
    res.status(200).json(project);
  } catch (err) {
    res.status(404).send("A project with that ID does not exist");
  }
});

//Get a list of actions by project
router.get("/:id/actions", async (req, res) => {
  const { id } = req.params;

  try {
    const test = await Projects.get(id);
    if (test) {
      try {
        const actionsByProject = await Projects.getProjectActions(id);
        res.status(200).json(actionsByProject);
      } catch (err) {
        res.status(500).send("There was an error getting actions by project");
      }
    }
  } catch {
    res.status(404).send("There are no projects with that ID.");
  }
});

//Create a new project
router.post("/", async (req, res) => {
  const { name, description } = req.body;
  if (name && description) {
    try {
      const newProject = await Projects.insert(req.body);
      res.status(200).json(newProject);
    } catch (err) {
      res.status(500).send("There was an error adding the new project.");
    }
  }
  res.status(400).send("A valid project requires a name and a description.");
});

//Update a project
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  if (name || description) {
    try {
      const test = await Projects.get(id);
      if (test) {
        try {
          const updatedProject = await Projects.update(id, req.body);
          res.status(200).json(updatedProject);
        } catch (err) {
          res.status(500).send("There was an error updating the project.");
        }
      }
    } catch (err) {
      res.status(404).send("A project with that ID does not exist");
    }
  }
});

// Delete a route
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const test = await Projects.get(id);
        if (test) {
          try {
            await Projects.remove(id);
            res.status(200).send(`Project ${id} has been deleted.`)
          } catch (err) {
            res.status(500).send("There was an error removing the project.");
          }
        }
      } catch (err) {
        res.status(404).send("A project with that ID does not exist");
      }
});

module.exports = router;
