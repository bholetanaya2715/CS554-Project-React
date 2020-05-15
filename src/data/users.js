const mongoCollections = require("./mongoCollections");
const users = mongoCollections.users;
var ObjectId = require("mongodb").ObjectId;



async function newAccount(email, userName) {
  if (typeof email != 'string') throw "Error: email should be of type string"
  console.log(userName)
  if (typeof userName !== 'string') throw "Error: username should be of type string"

  let newObj = {
    userId: email,
    displayName: userName,
    weight: 0,
    food: [],
    height: 0,
    targetToBeAchieved: null,
    current: null,
    water: {
      waterGoal: 0,
      waterCurrent: 0,
      timestamp: "",
    },
  };

  let userCollection = await users();
  let newUser = await userCollection.insertOne(newObj);
  if (newUser.insertedCount > 0) {
    return await getUserById(newUser.insertedId);
  }
  else {
    throw "Error: user was not inserted"
  }
}

// async function createFoodInstance(
//   userId,
//   weight,
//   height,

// ) {
//   if (!userId || typeof userId !== "string")
//     throw "You must provide your name for your acocunt";
//   if (!height || typeof height !== "number" || height <= 0)
//     throw "You must provide a valid height1.";
//   if (!weight || typeof weight !== "number" || weight <= 0)
//     throw "You must provide a valid weight1.";
//   const userCollection = await users();
//   const userData = await getUserByUserId(userId);
//   var newId;
//   if (userData == null) {
//     let newUser = {
//       userId: userId,
//       weight: weight,
//       food: [],
//       height: height,
//       targetToBeAchieved: targetToBeAchieved,
//       current: current,
//       water: {
//         waterGoal: 0,
//         waterCurrent: 0,
//         timestamp: "",
//       },
//     };
//     const insertInfo = await userCollection.insertOne(newUser);
//     if (insertInfo.insertedCount === 0)
//       throw "Could not create food instance for user";
//     newId = insertInfo.insertedId;
//   } else {
//     let updateUser = {
//       userId: userId,
//       weight: weight,
//       food: [],
//       height: height,
//       targetToBeAchieved: targetToBeAchieved,
//       current: current,
//       water: {
//         waterGoal: 0,
//         waterCurrent: 0,
//         timestamp: "",
//       },
//     };
//     const updatedInfo = await userCollection.replaceOne(
//       { _id: ObjectId(userData._id) },
//       updateUser
//     );
//     if (updatedInfo.modifiedCount === 0) {
//       throw "Could not update successfully";
//     }
//     newId = userData._id;
//   }
//   const user1 = await getUserById(newId);
//   return user1;
// }


async function addHeightWeight(userId, weight, height, displayName, target) {

  let userCollections = await users();
  let check = await getUserByUserId(userId);
  if (!check) {
    await newAccount(userId, displayName)
  }
  let status;
  console.log("target is ", target)
  //Changes for target
  if(!target){
    status = await userCollections.updateOne({ userId: userId }, { $set: { height: height, weight: weight } })
  }
  else{
    status = await userCollections.updateOne({ userId: userId }, { $set: { height: height, weight: weight, targetToBeAchieved: target } })
  }
  //-------------------------
  if (status.modifiedCount > 0) {
    return await getUserByUserId(userId)
  }
  else {
    throw "Error: user was not updated"
  }
}


async function getUserById(id) {
  const userCollection = await users();
  const user = await userCollection.findOne({ _id: ObjectId(id) });
  if (!user) throw "User not found";
  return user;
}

async function getUserByUserId(userId) {
  const userCollection = await users();
  const user = await userCollection.findOne({ userId: userId });
  return user;
}

async function getAllUsers() {
  const userCollection = await users();
  const a1 = await userCollection.find({}).toArray();
  if (!a1) throw "No users are in database";
  return a1;
}

module.exports = {
  getUserById,
  getUserByUserId,
  getAllUsers,
  newAccount,
  addHeightWeight
};
