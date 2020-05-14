const mongoCollections = require("../mongoCollections");
const users = mongoCollections.users;
const { ObjectId } = require("mongodb").ObjectId;
const food = require("../users");

async function setWaterCurrent(id, count, timestamp) {
  if (!id || typeof id !== "string" || id === undefined || id === null)
    throw "You must provide an id to search for";
  if (
    !timestamp ||
    typeof timestamp !== "string" ||
    timestamp === undefined ||
    timestamp === null
  ) {
    throw "You must provide an timestamp to search for";
  }
  if (typeof count !== "number" || count.length === 0)
    throw "Invalid Entry for count current";

  const userCollection = await users();
  const old = await food.getUserByUserId(id);
  // console.log(old);

  let waterCount = {
    waterGoal: old.water.waterGoal,
    waterCurrent: count,
    timestamp: timestamp,
  };

  let updatedFoodData;

  updatedFoodData = {
    userId: old.userId,
    displayName: old.displayName,
    weight: old.weight,
    food: old.food,
    height: old.height,
    targetToBeAchieved: old.targetToBeAchieved,
    current: old.current,
    water: waterCount,
  };

  const newInsertInformation = await userCollection.updateOne(
    { userId: id },
    { $set: updatedFoodData },
    { upsert: true }
  );
  // console.log(newInsertInformation);

  if (newInsertInformation.modifiedCount === 0) {
    throw `Could not update task`;
  }

  return await food.getUserByUserId(id);
}

async function setWaterCap(id, count) {
  if (!id || typeof id !== "string" || id === undefined || id === null) {
    throw "You must provide an id to search for";
  } else if (typeof count !== "number" || count < 0) {
    throw "Invalid Entry for count cap";
  } else {
    const userCollection = await users();
    const old = await food.getUserByUserId(id);
    let waterCount = {
      waterGoal: count,
      waterCurrent: 0,
      timestamp: old.water.timestamp,
    };

    let updatedFoodData;

    updatedFoodData = {
      userId: old.userId,
      displayName: old.displayName,
      weight: old.weight,
      food: old.food,
      height: old.height,
      targetToBeAchieved: old.targetToBeAchieved,
      current: old.current,
      water: waterCount,
    };

    const newInsertInformation = await userCollection.updateOne(
      { userId: id },
      { $set: updatedFoodData },
      { upsert: true }
    );
    // console.log(newInsertInformation);

    if (newInsertInformation.modifiedCount === 0) {
      throw `Could not update task`;
    }

    return await food.getUserByUserId(id);
  }
}

module.exports = {
  setWaterCurrent,
  setWaterCap,
};
