const express = require('express');
const port = 8000;
const app = express();
var dbConnect = require('./db');

const begin = async () => {
  let db;

  const config = require('dotenv').config();

  // console.log(process.env);

  await dbConnect();

  require('./routes')(app, db);
  app.listen(port, () => {
    console.log("connected on " + port);
  });
}

begin();
