Request	Endpoint	Required	Returns
get	api/projects		[ { id: number, name: string, description: string completed: boolean } ]
get	api/projects/:id	correct id in url	{ id: number, name: string, description: string completed: boolean }
get	api/projects/:id/actions	correct id in URL	[ { id: number, project_id: number, description: string, notes: string, completed: boolean } ]
post	api/projects	{ name: string description: string }	{ id: number, name: string, description: string completed: boolean }
put	api/projects/:id	correct id in url one or both of { name: string description: string }	{ id: number, name: string, description: string completed: boolean }
delete	api/projects/:id	correct id in url	“Project ${id} has been deleted"
get	api/actions		[ { id: number, project_id: number, description: string, notes: string. completed: boolean } ]
get	api/actions/:id	correct id in url	{ id: number, project_id: number, description: string, notes: string. completed: boolean }
post	api/actions	{ project_id: number, description: string, notes: string,	{ id: number, project_id: number, description: string, notes: string. completed: boolean }
put	api/actions/:id	valid id in url an object with any of the following: { project_id: number description: string notes: string }	{ id: number, project_id: number, description: string, notes: string. completed: boolean }
delete	api/actions/:id	valid ID in url	“The action was deleted successfully"

# Sprint Challenge: Express and Node.js - Projects & Actions

This challenge allows you to practice the concepts and techniques learned over the past Sprint and apply them in a concrete project. This Sprint explored Building RESTful Web APIs with Express and Node.js, Server-side Routing, Express Middleware & Deployment and Good Practices. In your challenge for this Sprint, you will demonstrate proficiency by creating an Web API using Node.js and Express.

## Instructions

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This is an individual assessment. All work must be your own. Your challenge score is a measure of your ability to work independently using the material covered through this sprint. You need to demonstrate proficiency in the concepts and objectives introduced and practiced in preceding days.

You are not allowed to collaborate during the Sprint Challenge. However, you are encouraged to follow the twenty-minute rule and seek support from your PM and Instructor in your cohort help channel on Slack. Your work reflects your proficiency Building RESTful APIs with Node.js and Express; and your command of the concepts and techniques taught during the Express and Node.js, Server-side Routing, Express Middleware & Deployment and Good Practices modules.

You have three hours to complete this challenge. Plan your time accordingly.

## Commits

Commit your code regularly and meaningfully. This helps both you (in case you ever need to return to old code for any number of reasons and your project manager).

## Description

In this challenge, create a web API around the following resources: `Projects` and `Actions`.

## Self-Study/Essay Questions

Demonstrate your understanding of this Sprint's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your project manager.

- [ ] Mention two parts of Express that you learned about this week.

1) Routing - allows selection of a handler function based on the url to which the call is made.
2) Middleware - Functions that receive requests (and responses, I believe), operate on them, and either send them along to the next piece of middleware in the stack or return the response to the user. So yeah, they handle responses too. Routes are middleware.

- [ ] Describe Middleware?

Ah. Above. 

- [ ] Describe a Resource?

Within the REST framework, everything is a resource. I think in this context, 'resource' is probably referring to either an entry of information in a database or a method written in a helper to access that database. When building an API, we've used http CRUD operations to access and modify those resources. 


- [ ] What can the API return to help clients know if a request was successful?

The API can return HTTP status codes between 200 and 299 to indicate a successful request. 

- [ ] How can we partition our application into sub-applications?

Express Routers allow us to partition apps by endpoints. I.e. in this challenge we'll be able to bucket out Projects and Actions.





## Project Setup

Follow these steps to set up and work on your project:

- [ ] Create a forked copy of this project.
- [ ] Add your _Project Manager_ as collaborator on Github.
- [ ] Clone your forked version of the Repository.
- [ ] Create a new Branch on the clone: git checkout -b `<firstName-lastName>`.
- [ ] Implement the project on this Branch, committing changes regularly.
- [ ] Push commits: git push origin `<firstName-lastName>`.

Follow these steps for completing your project.

- [ ] Submit a Pull-Request to merge <firstName-lastName> Branch into master on your fork. **Please don't merge your own pull request.**
- [ ] Add your _Project Manager_ as a Reviewer on the Pull-request
- [ ] Your _Project Manager_ will count the challenge as done by merging the branch into _master_.

## Database Persistence Helpers

Please read the following before implementing the Minimum Viable Product:

The `/data/helpers` folder includes files you can use to manage the persistence of _project_ and _action_ data. These files are `projectModel.js` and `actionModel.js`. Both files publish the following api, which you can use to store, modify and retrieve each resource:

**All these helper methods return a promise. Please you .then().catch() or async/await**

- `get()`: calling get returns an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if one is found.
- `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.
- `update()`: accepts two arguments, the first is the `id` of the resource to update, and the second is an object with the `changes` to apply. It returns the updated resource. If a resource with the provided `id` is not found, the method returns `null`.
- `remove()`: the remove method accepts an `id` as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

The `projectModel.js` helper includes an extra method called `getProjectActions()` that takes a _project id_ as it's only argument and returns a list of all the _actions_ for the _project_.

## Minimum Viable Product

- [ ] Configure an _npm script_ named _"server"_ that will execute your code using _nodemon_. Make _nodemon_ be a development time dependency only, it shouldn't be deployed to production.
- [ ] Configure an _npm script_ named _"start"_ that will execute your code using _node_.

Design and build the necessary endpoints to:

- [ ] Perform CRUD operations on _projects_ and _actions_.
- [ ] Retrieve the list of actions for a project.

### Database Schemas

The _schemas_ (properties and data type of each property) used to store and retrieve the resources inside the included database (`lambda.sqlite3`) is described below.

#### Projects

| Field       | Data Type | Metadata                                                                    |
| ----------- | --------- | --------------------------------------------------------------------------- |
| id          | number    | no need to provide it when creating projects, the database will generate it |
| name        | string    | required.                                                                   |
| description | string    | required.                                                                   |
| completed   | boolean   | used to indicate if the project has been completed, not required            |

#### Actions

| Field       | Data Type | Metadata                                                                                         |
| ----------- | --------- | ------------------------------------------------------------------------------------------------ |
| id          | number    | no need to provide it when creating posts, the database will automatically generate it.          |
| project_id  | number    | required, must be the id of an existing project.                                                 |
| description | string    | up to 128 characters long, required.                                                             |
| notes       | string    | no size limit, required. Used to record additional notes or requirements to complete the action. |
| completed   | boolean   | used to indicate if the action has been completed, not required                                  |

We have provided test data for all the resources.

Now that we have a way to add, update, remove and retrieve data from the provided database, it's time to work on the API.

## Stretch Goal

- Use `create-react-app` to create an application in a separate folder (outside the API project folder). Name it anything you want.
- From the React application show a list of all _projects_ using the API you built.
- Add functionality to show the details of a project, including its actions, when clicking a project name in the list. Use React Router to navigate to a separate route to show the project details.
- Add styling! Perhaps with [`styled-components`](https://www.styled-components.com/).
