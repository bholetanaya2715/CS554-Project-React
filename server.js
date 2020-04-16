const express = require("express");
const app = express();
const configRoutes = require("./src/routes");
const cors = require("cors");

app.use(cors());

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
configRoutes(app);

app.listen(8000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:8000");
});
