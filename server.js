const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const port = 8000;
const app = express();
const connectionString = 'mongodb+srv://application:SsJ5T1DcKoNF11vW@cluster0.3gqmz.gcp.mongodb.net/application?retryWrites=true&w=majority'

const begin = async () => {
  let db;

  const getDB = async () => {
    await MongoClient.connect(connectionString, {
      useUnifiedTopology: true
    }).then(client => {
      return db = client.db('test');
    });
  };

  await getDB();

  require('./routes')(app, db);app.listen(port, () => {
    console.log("connected on " + port);
  });
}

begin();