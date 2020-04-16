const mongoCollections = require("./mongoCollections");
const account = mongoCollections.account;
const { ObjectId } = require("mongodb").ObjectId;
const food = require("./users");

async function createAccount(name, userName, password) {
  if (!name || typeof name !== "string")
    throw "You must provide your name for your acocunt";
  if (!userName || typeof userName !== "string")
    throw "You must provide your Username for your acocunt";
  if (!password || typeof password !== "string")
    throw "You must provide your password for your acocunt";

  const userCollection = await account();
  let user = 0;
  let newUser = {
    name: name,
    userName: userName,
    password: password,
  };

  const insertInfo = await userCollection.insertOne(newUser);
  if (insertInfo.insertedCount === 0) {
    throw "Could not add animal";
  } else {
    const newId = insertInfo.insertedId;
    user = food.createFoodInstance(newId);
  }
  return user;
}

module.exports = {
  createAccount,
};
