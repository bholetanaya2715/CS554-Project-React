const express = require("express");
const router = express.Router();
const data = require("../data");
const food = require("../data/food");
const axios = require("axios");
const bluebird = require("bluebird");
const redis = require("redis");
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);


router.post("/", async (req, res) => {
    let foodInfo = req.body;
    //console.log("Post in food route is hit");
    //console.log(foodInfo);

    if(typeof foodInfo != 'object' ||  foodInfo == null) throw 'Invalid input exception'

    try {
        const updatedObj = await food.postFoodById(foodInfo.id,foodInfo.foodArr, foodInfo.target)
        //console.log(updatedObj)
        res.json(updatedObj);
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    //console.log("Get is hit");
    try {
        const user = await userMethods.getUserById(id);
        res.json(user);
    }
    catch (e) {
        console.log("Server Error is " + e);
        res.status(500).json(e)
    }
})

router.post("/updateTarget", async (req, res) => {
    let foodInfo = req.body;
    //console.log("Post in food route is hit");
    //console.log(foodInfo);

    if(typeof foodInfo != 'object' ||  foodInfo == null) throw 'Invalid input exception'

    try {
        const updatedObj = await food.updateTarget(foodInfo.id, foodInfo.target)
        //console.log(updatedObj)
        res.json(updatedObj);
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
})

router.post("/updateCurrent", async (req, res) => {
    let foodInfo = req.body;
    //console.log("Post in food route is hit");
    //console.log(foodInfo);

    if(typeof foodInfo != 'object' ||  foodInfo == null) throw 'Invalid input exception'

    try {
        const updatedObj = await food.updateCurrent(foodInfo.id, foodInfo.current)
        //console.log(updatedObj)
        res.json(updatedObj);
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
})

router.post("/getFoodData", async (req, res) => {
    let foodInfo = req.body;
    //console.log("Post in get food route is hit");
    //console.log(foodInfo);

    if(typeof foodInfo != 'object' ||  foodInfo == null) throw 'Invalid input exception';

    try {

        let foodCache = await client.lrangeAsync('foodCache', 0, -1);

        let foodItem = foodCache.find(data => {
            let d = JSON.parse(data);
            if(d.food_name == foodInfo.foodQuery) return d;
        });
        let response;
        let foodResponse;
        if(foodItem != undefined){
            foodResponse = {foods : [JSON.parse(foodItem)]}
            console.log("foodResponse is ", foodResponse)
        }
        
        if(foodItem == undefined){
            let config = {
                method: 'post',
                url: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
                data: {
                    "query": foodInfo.foodQuery
                },
                headers: {
                    'Content-Type': 'application/json',
                    'x-app-id' : '5a16d255',
                    'x-app-key' : 'c6d62bf1fa1b98f09f0bd525d1c94007'
                }
            }
            response = await axios(config);
            foodResponse = response.data;
            console.log("foodItem is")
            console.log(foodItem)
            await client.lpushAsync(['foodCache', JSON.stringify(foodResponse.foods[0])]);
        }
    
        res.json(foodResponse);

    } catch (e) {
        console.log(e)
        res.json(e)
    }

})




module.exports = router;