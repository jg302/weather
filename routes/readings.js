const moment = require('moment');

module.exports = function(app, db) {
    // Init collection
    const readings = db.collection('readings')

    app.get('/readings', (req, res) => {
      res.status(200).send("Hi");
    })

    app.post('/readings', (req, res) => {
      if (!req.body) {
        res.status(400);
        const msg = "No body in request";
        console.warn(msg);
        return res.send(msg);
      }

      const { indoorT, humidity, waterT, outT, key } = req.body;

      if (key !== process.env.API_KEY) {
        console.warn("Key was wrong");
        return res.status(403).send("Key wrong");
      }

      if (!indoorT && !humidity && !waterT && !outT) {
        res.status(400);
        const msg = "All values missing ";
        console.warn(msg);
        return res.send(msg);
      }

      if (typeof indoorT !== 'string') {
        res.status(400);
        const msg = "Temperature should be a number, got " + typeof indoorT;
        console.warn(msg);
        return res.send(msg);
      }

      const dateUTC = moment().format();
      const record = { indoorT, humidity, waterT, outT, dateUTC };

      readings.insertOne(record).then(() => {
        res.send("Logged ok, temp : " + indoorT);
      }).catch((e) => {
        console.warn(e);
        return res.status(500).send();
      })
  });
};
