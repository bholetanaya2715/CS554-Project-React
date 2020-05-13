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

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const user = await userMethods.getUserById(id);
    res.json(user);
  } catch (e) {
    res.status(500).json(e);
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
  if (!height || typeof height !== "number" || height <= 0)
    throw "You must provide a valid height.";
  if (!weight || typeof weight !== "number" || weight <= 0)
    throw "You must provide a valid weight.";

  try {
    const user = await userMethods.createFoodInstance(
      userInformation.userID,
      weight,
      height
    );
    res.json(user);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
