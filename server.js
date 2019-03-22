const express = require('express');

const server = express();

server.use(express.json())

server.get("/", (req, res) => {
    res.send(`<h1>Sprint Challenge: Node and Express</h1>`);
})

module.exports = server;