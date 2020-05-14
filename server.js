const express = require("express");
const admin = require("firebase-admin")
const app = express();
const configRoutes = require("./src/routes");
const cors = require("cors");
const bodyparser = require("body-parser")

app.use(cors());

var serviceAccount = require("./cs-554-project-firebase-adminsdk-k8wmd-ccd7fa09f4.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

function checkAuth(req, res, next) {
  if (req.headers.authtoken) {
    admin.auth().verifyIdToken(req.headers.authtoken)
      .then(() => {
        next()
      }).catch(() => {
        res.status(403).send('Unauthorized')
      });
  } else {
    res.status(403).send('Unauthorized')
  }
}

// app.use('/', checkAuth)

// const main = async () => {
//   //   try {
//   //     const createUser = await account.createAccount("Parth", "pxp", "123");
//   //     console.log(createUser);
//   //   } catch (e) {
//   //     console.log(e);
//   //   }
//   try {
//     const updateWater = await water.setWaterCurrent(
//       "5e921850cba3c3ff5f6610ca",
//       4
//     );
//     console.log(updateWater);
//   } catch (e) {
//     console.log(e);
//   }
// };
// main();

app.use(express.json());
app.use(bodyparser.json())
configRoutes(app);

app.listen(8000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:8000");
});
