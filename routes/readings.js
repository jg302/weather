const moment = require('moment');

module.exports = function(app, db) {
    // Init collection
    const readings = db.collection('readings')

    app.post('/readings', (req, res) => {
      const { indoorT, humidity, waterT, outT, key } = req.query;

      if (key !== process.env.API_KEY) {
        return res.status(403).send("Key wrong")
      }

      if (typeof indoorT !== 'string') {
        res.status(400);
        return res.send("Temperature should be a number, got " + typeof indoorT);
      }

      const dateUTC = moment().format();
      const record = { indoorT, humidity, waterT, outT, dateUTC };

      readings.insertOne(record);
      res.send("Logged a temp of " + indoorT);
  });
};
