const mongoose = require('mongoose');
const consts = require('./constants');

const { DB_HOST, DB_USER, DB_PASS } = consts;

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}`;

mongoose
  .connect(url)
  .then(() => console.log('connected'))
  .catch((err) => console.log(`connection error: ${err}`));
