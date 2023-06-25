const express = require('express');
const port = 8000;
const app = express();
var dbConnect = require('./db');

const begin = async () => {
  let db;

  require('dotenv').config();
  await dbConnect().then(mongo => db = mongo);

  require('./routes')(app, db);
  
  app.listen(port, () => {
    console.log("connected on " + port);
  });
}

begin();
