// Imports
require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const { reportsRouter } = require('../router/reports.router');

// Constants
const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

// Routes
app.use('/reports', reportsRouter);

// Connection
app.use((req, res) => {
  res.status(400).send("Couldn't connect");
});

// Start server
app.listen(port, () => console.log(`Express server is running on port ${port}`));

module.exports = app;
