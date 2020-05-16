const express = require("express");
const router = express.Router();
const data = require("../data");
const userMethods = data.users;
const accountMethods = data.account;
const waterMethods = data.water;
const foodHistory = data.history;

router.post("/adduser", async (req, res) => {
  console.log("add user route Called");
  if (!req.body) throw "Error: request body is not provided";
  if (!req.body.userName) "Error: userName not provided in request body";
  if (!req.body.email) "Error: email not provided in request body";
  try {
    const usr = await userMethods.newAccount(req.body.email, req.body.userName);
    res.json(usr);
  } catch (e) {
    console.log(e);
    res.json({ Error: e });
  }
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const user = await userMethods.getUserByUserId(id);
    //console.log(user);
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
  console.log("addinfo is hit")

  let userInformation = req.body;
  const userID = userInformation.userID;
  const height = parseInt(userInformation.heightData);
  const weight = parseInt(userInformation.weightData);
  const target = parseInt(userInformation.targetData);            //Changes for target
  const displayName = userInformation.displayName;
  if (!userID || typeof userID !== "string")
    throw "You must register an email id.";
  if (!height || typeof height !== "number" || height <= 0)
    throw "You must provide a valid height.";
  if (!weight || typeof weight !== "number" || weight <= 0)
    throw "You must provide a valid weight.";
  if (target && typeof target !== "number" || target <= 0)
    throw "You must provide a valid target calorie.";


  try {
    const user = await userMethods.addHeightWeight(
      userInformation.userID,
      weight,
      height,
      displayName,
      target
    );
    res.json(user);
  } catch (e) {
    res.status(500).json(e);
  }
});


/**
 * Get user's diet history
 */
router.get("/foodHistory/:id", async (req, res) => {
  let userId = req.params.id;
  try {
    console.log("hi")
    const history = await foodHistory.getUserHistory(userId);
    res.json(history);
  } catch (e) {
    res.status(500).json(e);
  }
});


module.exports = router;
