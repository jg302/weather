const { MongoClient, ServerApiVersion } = require("mongodb");

async function run() {
  var serverKey = process.env.SERVER_KEY;

  const uri = `mongodb+srv://application:${serverKey}@weatherstn.3gqmz.mongodb.net/?retryWrites=true&w=majority`;

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  if (!serverKey) {
    throw Error("No key");
  }

  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    const dbs = await client.db('weather');
    return dbs;

  } finally {
    // await client.close();
  }
}

module.exports = run;
