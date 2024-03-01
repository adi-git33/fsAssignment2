// Imports
require('express-async-errors');
const express = require('express');
const logger = require('morgan');
const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');
const errorHandeler = require('../middlewear/errorHandler');
const { reportsRouter } = require('../router/reports.router');
const filePath = require('../middlewear/logger');

// Constants
const app = express();
const port = process.env.PORT || 8080;
const logStream = fs.createWriteStream(filePath, { flags: 'a' });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(logger('combined', { stream: logStream }));

// Routes
app.use('/reports', reportsRouter);
app.use(errorHandeler);
// Connection
app.use((req, res) => {
  res.status(400).send("Couldn't connect");
});

// Start server
app.listen(port, () => console.log(`Express server is running on port ${port}`));

module.exports = app;
