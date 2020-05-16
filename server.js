const express = require("express");
const app = express();
const configRoutes = require("./src/routes");
const cors = require("cors");
const bodyparser = require("body-parser");

app.use(cors());


// app.use('/', checkAuth)

app.use(express.json());
app.use(bodyparser.json());
configRoutes(app);

app.listen(8000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:8000");
});
