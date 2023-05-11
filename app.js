"use strict";

const express = require("express");
const app = express();

const { NotFoundError } = require("./expressError")


const morgan = require("morgan");
const itemRoutes = require("./itemRoutes");

// log requests
app.use(morgan('dev'));

// Get a middleware function and register it for all routes
app.use(express.json());

// Follow item routes
app.use("/items", itemRoutes)

/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
    throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
    const status = err.status || 500;
    const message = err.message;
    if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
    return res.status(status).json({ error: { message, status } });
});


module.exports = app;