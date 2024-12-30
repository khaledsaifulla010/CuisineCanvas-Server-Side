const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;
// Middlewares //

app.use(cors());
app.use(express.json());

// Server Running //

app.get("/", (req, res) => {
  res.send("CuisineCanvas Server is Running");
});

app.listen(port, () => {
  console.log(`CuisineCanvas Server is Running on ${port}`);
});
