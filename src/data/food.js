const mongoCollections = require('./mongoCollections');
const users = mongoCollections.users;
const { ObjectId } = require("mongodb").ObjectId;

async function postFoodById(userId, foodArray) {
    if (!userId) throw "You must provide userId";
    if(!foodArray || !Array.isArray(foodArray)) throw "You must provide food object";
    console.log("1")
    const userCollection = await users();
    console.log("2")

    
    const updateInfo = await userCollection.updateOne({ _id: ObjectId(userId) }, {$push:{ food: foodArray}});
    console.log("3")
    console.log(updateInfo);
    if (updateInfo.modifiedCount === 0 || updateInfo.modifiedCount == undefined) {
        throw "could not update food";
    }
    console.log("3.5");
    const user = await userCollection.findOne({ _id: ObjectId(userId) });
    
    
    console.log("4");
    if (!user) throw 'User not found';
    console.log("5");

    return user;

}


async function rename(id, newName, newType){
    if(!id) throw "Please provide id";
    if(!newName && !newType) throw "Please provide new name or type";

    if(typeof id == "number" || typeof newName == "number" || Array.isArray(id) || Array.isArray(newName) ||
        typeof newName == "object" || typeof newType == "number" || Array.isArray(newType) ||
        typeof newType == "object") throw "Please provide proper input type";

    const animalCollection = await animals();
    let updatedanimal = {};
    
    if(newName && newType){
        updatedanimal = {
            $set:{name: newName,
            animalType: newType} 
        };
    }
    else if(newName){
        updatedanimal = {
            $set:{name: newName} 
        };
    }
    else if(newType){
        updatedanimal = {
            $set:{animalType: newType} 
        };
    }
  
    const updateInfo = await animalCollection.updateOne({ _id: id }, updatedanimal);
    if (updateInfo.modifiedCount === 0) {
        throw "could not update animal successfully";
    }

    return await this.get(id);
}


async function getFoodById(id) {
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: ObjectId(id) });
    if (!user) throw 'User not found';
    return user;
}

async function getUserByUserName(userName) {
    const userCollection = await users();
    const user = await userCollection.findOne({ userName: userName });
    if (!user) throw 'Account with that username not found';
    return user;
}

async function getAllUsers() {
    const userCollection = await users();
    const a1 = await userCollection.find({}).toArray();
    if (!a1) throw "No users are in database";
    return a1;
}


module.exports = {
    postFoodById
}