const express = require("express");
const router = express.Router();
const data = require("../data/");
const waterMethods = data.water;
const userMethods = data.users;
const accountMethods = data.account;

router.post("/current", async (req, res) => {
  let waterInfo = req.body;
  console.log(waterInfo);
  // console.log("From Routes /water/current : ", waterInfo);
  if (!waterInfo.id) {
    console.log("1");
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
    console.log("2");

    res.status(400).json({ error: "Invalid Entry for ID" });
    return;
  }

  if (!waterInfo.timestamp) {
    console.log("3");

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
    console.log("4");
    res.status(400).json({ error: "Invalid Entry for ID" });
    return;
  }

  if (
    typeof waterInfo.count == "undefined" ||
    typeof waterInfo.count !== "number" ||
    waterInfo.count < 0 ||
    waterInfo.count === undefined ||
    waterInfo.count === null ||
    waterInfo.count === ""
  ) {
    console.log("5");
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

router.post("/cap", async (req, res) => {
  let waterInfo = req.body;
  // console.log("From Routes /water/cap: ", waterInfo);
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

module.exports = router;
