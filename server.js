const express = require("express");
const app = express();
const configRoutes = require("./src/routes");
const cors = require("cors");
const bodyparser = require("body-parser");
const checkAuth = require("./src/routes/checkAuth")

app.use(cors());
// app.use(express.static('./public'))

app.use('/', checkAuth.checkAuth)
console.log('dir__' + __dirname)
app.use(express.json());
app.use(bodyparser.json());
// app.use(express.static(__dirname + '/public'))
configRoutes(app);

app.listen(8000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:8000");
});
