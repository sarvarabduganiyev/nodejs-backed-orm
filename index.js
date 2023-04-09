const express = require("express");
const app = express();
const router = require("./router/routes");
require("dotenv").config();
const morgan = require("morgan");
morgan("tiny");

// middlewere
app.use(express.json());
app.use("/api", router);

// port
const port = process.env.PORT || 3003;

// listening...
app.listen(port, () => {
  console.log(`Listening http://localhost:${port}`);
});
