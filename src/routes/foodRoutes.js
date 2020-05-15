const express = require("express");
const router = express.Router();
const data = require("../data");
const food = data.food;

router.post("/", async (req, res) => {
    let foodInfo = req.body;
    console.log("Post in food route is hit");
    console.log(foodInfo);

    if(typeof foodInfo != 'object' ||  foodInfo == null) throw 'Invalid input exception'


    try {
        const updatedObj = await food.postFoodById(foodInfo.id,foodInfo.foodArr)
        console.log(updatedObj)
        res.json(updatedObj);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    console.log("Get is hit");
    try {
        const user = await userMethods.getUserById(id);
        res.json(user);
    }
    catch (e) {
        console.log("Server Error is " + e);
        res.status(500).json(e)
    }
})



module.exports = router;