const express = require('express');

const server = express();

//import routers
const projectRouter = require('./data/routers/projectRouters.js');
const actionRouter = require('./data/routers/actionRouters.js');

//middleware
server.use(express.json())

//routing
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter)

server.get("/", (req, res) => {
    res.send(`<h1>Sprint Challenge: Node and Express</h1>`);
})

module.exports = server;