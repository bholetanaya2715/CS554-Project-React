const express = require("express");
const router = express.Router();
const data = require("../data");
const userMethods = data.users;
const accountMethods = data.account;
const waterMethods = data.water;

router.post("/", async (req, res) => {
  let userInfo = req.body;

  if (!userInfo.name) {
    res.status(400).json({ error: "You must provide a name" });
    return;
  }

  if (!userInfo.username) {
    res.status(400).json({ error: "You must provide Username" });
    return;
  }
  if (!userInfo.password) {
    res.status(400).json({ error: "You must provide password" });
    return;
  }

  try {
    const newUser = await accountMethods.createAccount(
      userInfo.name,
      userInfo.username,
      userInfo.password
    );
    res.json(newUser);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post("/water/current", async (req, res) => {
  let waterInfo = req.body;
  console.log("From Routes /water/current : ", waterInfo);
  if (!waterInfo.id) {
    res.status(400).json({ error: "You must provide a id" });
    return;
  }
  if (
    typeof waterInfo.id == "undefined" ||
    typeof waterInfo.id !== "string" ||
    waterInfo.id.length <= 0 ||
    waterInfo.id === undefined ||
    waterInfo.id === null ||
    waterInfo.id === ""
  ) {
    res.status(400).json({ error: "Invalid Entry for ID" });
    return;
  }

  if (!waterInfo.timestamp) {
    res.status(400).json({ error: "You must provide a timestamp" });
    return;
  }
  if (
    typeof waterInfo.timestamp == "undefined" ||
    typeof waterInfo.timestamp !== "string" ||
    waterInfo.timestamp.length <= 0 ||
    waterInfo.timestamp === undefined ||
    waterInfo.timestamp === null ||
    waterInfo.timestamp === ""
  ) {
    res.status(400).json({ error: "Invalid Entry for ID" });
    return;
  }

  // if (!waterInfo.count) {
  //   res.status(400).json({ error: "You must provide a Water Count" });
  //   console.log("3");

  //   return;
  // }
  if (
    typeof waterInfo.count == "undefined" ||
    typeof waterInfo.count !== "number" ||
    waterInfo.count < 0 ||
    waterInfo.count === undefined ||
    waterInfo.count === null ||
    waterInfo.count === ""
  ) {
    res.status(400).json({ error: "Invalid Entry for Water Cup Number" });
    return;
  }

  try {
    const newWaterCurrent = await waterMethods.setWaterCurrent(
      waterInfo.id,
      waterInfo.count,
      waterInfo.timestamp
    );
    res.json(newWaterCurrent);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const user = await userMethods.getUserById(id);
    res.json(user);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post("/water/cap", async (req, res) => {
  let waterInfo = req.body;
  console.log("From Routes /water/cap: ", waterInfo);
  if (!waterInfo.id) {
    res.status(400).json({ error: "You must provide a id" });
    return;
  }
  if (
    typeof waterInfo.id == "undefined" ||
    typeof waterInfo.id !== "string" ||
    waterInfo.id.length <= 0 ||
    waterInfo.id === undefined ||
    waterInfo.id === null ||
    waterInfo.id === ""
  ) {
    res.status(400).json({ error: "Invalid Entry for ID" });
    return;
  }

  // if (!waterInfo.count) {
  //   res.status(400).json({ error: "You must provide a Cap Count" });
  //   return;
  // }
  if (
    typeof waterInfo.count == "undefined" ||
    typeof waterInfo.count !== "number" ||
    waterInfo.count.length <= 0 ||
    waterInfo.count === undefined ||
    waterInfo.count === null ||
    waterInfo.count === ""
  ) {
    res.status(400).json({ error: "Invalid Entry for Water Quantity" });
    return;
  }

  try {
    const newWaterCap = await waterMethods.setWaterCap(
      waterInfo.id,
      waterInfo.count
    );
    // console.log(newWaterCap);
    res.json(newWaterCap);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get("/user/:username", async (req, res) => {
  let username = req.params.username;
  try {
    const user = await userMethods.getUserByUserName(username);
    res.json(user);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post("/user/addInforamtion", async (req, res) => {
  let userInformation = req.body;
  const emailId = userInformation.userID;
  const height = parseInt(userInformation.heightData);
  const weight = parseInt(userInformation.weightData);
  if (!emailId || typeof emailId !== "string")
    throw "You must register an email id.";
  if (!height || typeof height !== "number")
    throw "You must provide a valid height.";
  if (!weight || typeof weight !== "number")
    throw "You must provide a valid weight.";

  try {
    const user = await userMethods.createFoodInstance(
      userInformation.userID,
      userInformation.weightData,
      userInformation.heightData
    );
    console.log(user);
    res.json(user);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
