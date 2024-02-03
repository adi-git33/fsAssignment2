// Requires
require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const db = require('./db/databaseConnection');
const { reportsRouter } =require('./router/reports.router');

// Constants
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/reports', reportsRouter);

// Connection
app.use((req, res) => {
   res.status(400).send("Couldn\'t connect");
});

// Start server
app.listen(port, () => console.log(`Express server is running on port ${port}`));