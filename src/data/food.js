const mongoCollections = require('./mongoCollections');
const users = mongoCollections.users;
const { ObjectId } = require("mongodb").ObjectId;

async function postFoodById(userId, foodArray, target) {
    if (!userId) throw "You must provide userId";
    //console.log(foodArray)
    if(!foodArray) throw "You must provide food object";
    if(!target) throw "You must provide current value";
    const userCollection = await users();
    
    let updateInfo = await userCollection.updateOne({ userId : userId }, {$push:{ food: [foodArray]}});
    updateInfo = await userCollection.updateOne({ userId : userId }, {$set:{ current: target}});
    //console.log(updateInfo);
    
    if ((updateInfo.modifiedCount === 0 || updateInfo.modifiedCount == undefined) && updateInfo.matchedCount == 1) {
        console.log("Multiple attempts to update food");
    }
    else if (updateInfo.modifiedCount === 0 || updateInfo.modifiedCount == undefined) {
        throw "could not update food";
    }
    const user = await userCollection.findOne({ userId: userId });
    
    
    if (!user) throw 'User not found';

    return user;

}

async function updateTarget(userId, target) {
    if (!userId) throw "You must provide userId";
    if(!target) throw "You must provide target";
    const userCollection = await users();
    
    const updateInfo = await userCollection.updateOne({ userId : userId }, {$set:{ targetToBeAchieved: target}});
    //console.log(updateInfo);
    
    if ((updateInfo.modifiedCount === 0 || updateInfo.modifiedCount == undefined) && updateInfo.matchedCount == 1) {
        console.log("Multiple attempts to update target");
    }
    else if (updateInfo.modifiedCount === 0 || updateInfo.modifiedCount == undefined) {
        throw "could not update food";
    }
    const user = await userCollection.findOne({ userId: userId });
    
    
    if (!user) throw 'User not found';

    return user;

}


async function updateCurrent(userId, current) {
    if (!userId) throw "You must provide userId";
    if(!current) throw "You must provide target";
    const userCollection = await users();
    
    const updateInfo = await userCollection.updateOne({ userId : userId }, {$set:{ current: current}});
    //console.log(updateInfo);
    
    if ((updateInfo.modifiedCount === 0 || updateInfo.modifiedCount == undefined) && updateInfo.matchedCount == 1) {
        console.log("Multiple attempts to update current food goal");
    }
    else if (updateInfo.modifiedCount === 0 || updateInfo.modifiedCount == undefined) {
        throw "could not update food";
    }
    const user = await userCollection.findOne({ userId: userId });
    
    
    if (!user) throw 'User not found';

    return user;

}




module.exports = {
    postFoodById,
    updateTarget,
    updateCurrent
}