const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
// Middlewares //

app.use(cors());
app.use(express.json());

// Connect With MongoDB //
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ugbxhsw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // ALL DATABASE COLLECTION//
    const menuCollections = client.db("CuisineCanvas").collection("menu");
    const cartCollections = client.db("CuisineCanvas").collection("carts");

    // GET ALL MENU DATA //

    app.get("/menu", async (req, res) => {
      const result = await menuCollections.find().toArray();
      res.send(result);
    });

    // // GET ALL CARTS ITEMS //

    // app.get("/carts", async (req, res) => {
    //   const result = await cartCollections.find().toArray();
    //   res.send(result);
    // });

    // GET ALL CARTS ITEMS INDIVIDUALLY //

    app.get("/carts", async (req, res) => {
      const email = req.query.email;

      const query = { email: email };

      const result = await cartCollections.find(query).toArray();
      res.send(result);
    });

    // POST CART ITEMS //

    app.post("/carts", async (req, res) => {
      const cartItem = req.body;
      const result = await cartCollections.insertOne(cartItem);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

// Server Running //

app.get("/", (req, res) => {
  res.send("CuisineCanvas Server is Running");
});

app.listen(port, () => {
  console.log(`CuisineCanvas Server is Running on ${port}`);
});
