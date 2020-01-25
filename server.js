const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const port = 8000;
const app = express();

require('./routes')(app, {});app.listen(port, () => {  console.log('We are live on ' + port);});
