const moment = require('moment');

module.exports = function(app, db) {
    // Init collection
    const readings = db.collection('readings')

    app.post('/readings', (req, res) => {
      const { temperature } = req.query;

      if (typeof temperature !== 'string') {
        res.status(400);
        return res.send("Temperature should be a number, got " + typeof temperature);
      }

      const dateUTC = moment().format();
      const record = { temperature, dateUTC };

      readings.insertOne(record);
      res.send("Logged a temp of " + temperature);
  });
};
