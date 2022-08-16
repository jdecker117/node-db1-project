const express = require("express");

const server = express();

server.use(express.json());

server.use((err, req, res, next) => {
    let { status = 500, message = 'internal server error' } = err;
    res.status(status).json({ message: message });
  });

module.exports = server;
