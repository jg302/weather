const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const port = 8000;
const app = express();
const connectionString = 'mongodb+srv://application:SsJ5T1DcKoNF11vW@cluster0.3gqmz.gcp.mongodb.net/application?retryWrites=true&w=majority'

require('./routes')(app, {});app.listen(port, () => {
  MongoClient.connect(connectionString, {
    useUnifiedTopology: true
  }, (err, client) => {
    console.log(connectionString);
    if (err) return console.error(err)
    console.log('Connected to Database')
  })
});
