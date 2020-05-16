const userData = require('./users')
const mongoCollections = require('./mongoCollections');
const users = mongoCollections.users;
const { ObjectId } = require("mongodb").ObjectId;

/**
 * Get user history by user id
 */
async function getUserHistory(id) {

    if (!id) {
        console.log('Invalid id in user foodHistory', id)
        throw "Invalid Data";
    }

    let user = userData.getUserById(id)
    let userHistory = {}
    userHistory.calorie = []

    for (let food of user.foodArray) {
        userHistory.calorie.push(food.calorie)
    }

    userHistory.tagetToBeAchieved = user.tagetToBeAchieved

    userHistory.current = user.current

    return userHistory

}


module.exports = {
    getUserHistory
}