const express = require('express');
const bodyParser = require('body-parser')

const port = 8000;
const app = express();
var dbConnect = require('./db');


const begin = async () => {
  let db;

  require('dotenv').config();
  await dbConnect().then(mongo => db = mongo);

  // create application/x-www-form-urlencoded parser
  app.use(bodyParser.urlencoded({ extended: false }))
  require('./routes')(app, db);
  
  app.listen(port, () => {
    console.log("connected on " + port);
  });
}

begin();
