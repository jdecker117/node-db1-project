const express = require("express");
const accountRouter = require('./accounts/accounts-router')

const server = express();

server.use(express.json());

server.use('/api/accounts', accountRouter)

server.use((err, req, res, next) => {
    let { status = 500, message = 'internal server error' } = err;
    res.status(status).json({ message: message });
  });

module.exports = server;
