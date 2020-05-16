import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../firebase/Auth";
import axios from "axios";
import Navigation from "./Navigation";
import logo from "../icon.png";

const FoodMain = (props) => {
  const [userData, setUserData] = useState(undefined);
  const [foodData, setFoodData] = useState(undefined);
  const [foodQuery, setFoodQuery] = useState("");
  const { currentUser } = useContext(AuthContext);
  console.log(userData);
  const userId = currentUser.providerData[0].email;
  console.log("userid is " + currentUser.providerData[0].email);

  var d = new Date();
  var date = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

  async function fetchData() {
    const res = await fetch("http://localhost:8000/api/" + userId);
    res
      .json()
      .then((res) => {
        console.log("response is " + res);
        if (res.targetToBeAchieved == null) {
          res.targetToBeAchieved = 2000;
          res.current = 0;
          updateTarget(res.userId, 2000);
        }
        if (res.water.timestamp !== date) {
          updateTimestamp(res, date);
          updateCurrent(res.userId, res.targetToBeAchieved);
        }
        setUserData(res);
      })
      .catch((err) => console.log("error is " + err));
  }

  async function updateTimestamp(res, date) {
    let payload = {
      id: res.userId,
      count: res.water.waterCurrent,
      timestamp: date,
    };
    const val = await axios.post(
      "http://localhost:8000/api/water/current",
      payload
    );
  }

  async function postData() {
    const res = await fetch("http://localhost:8000/api", {
      method: "POST",
      body: JSON.stringify({
        name: "Sejal Vyas",
        username: "blackwidow",
        password: "myPassword",
      }),
    });
    res
      .json()
      .then((res) => {
        console.log("response is " + res);
        setUserData(res);
      })
      .catch((err) => console.log("error is " + err));
  }

  async function getFoodData() {
    const res = await fetch("http://localhost:8000/api/food/getFoodData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        foodQuery: foodQuery,
      }),
    });

    let response = await res.json();
    console.log("Response from routes is");
    console.log(response);
    setFoodData(response.foods);
    console.log("foodData is");
    console.log(foodData);
    updateFoodData(response.foods);
  }

  async function postFoodData(id, foodArr, target) {
    console.log("foodData in postFoodData is");
    console.log(foodArr);
    const res = await fetch("http://localhost:8000/api/food", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        foodArr: foodArr,
        target: target,
      }),
    });

    let response = await res.json();
    setUserData(response);
  }

  async function updateTarget(id, target) {
    const res = await fetch("http://localhost:8000/api/food/updateTarget", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        target: target,
      }),
    });
    let response = await res.json();
    setUserData(response);
  }

  async function updateCurrent(id, current) {
    const res = await fetch("http://localhost:8000/api/food/updateCurrent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        current: current,
      }),
    });
    let response = await res.json();
    setUserData(response);
  }

  async function updateFoodData(foodData) {
    console.log("foodData");
    console.log(foodData[0].nf_calories);
    console.log("userData.targetToBeAchieved");
    console.log(userData.targetToBeAchieved);
    if (userData.current == 0) {
      userData.current = userData.targetToBeAchieved - foodData[0].nf_calories;
    } else if (userData.current > 0 || userData.current < 0) {
      userData.current = userData.current - foodData[0].nf_calories;
    }
    console.log("UPDATED userdata");
    console.log(userData);
    postFoodData(userId, foodData[0], userData.current);
    setUserData(userData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleChange(event) {
    setFoodQuery(event.target.value);
  }

  async function handleSubmit(event) {
    getFoodData();
    //await updateFoodData();
    event.preventDefault();
  }

  return (
    <div>
      <header className="App-header">
        <a href="/">
          <img src={logo} className="App-logo" alt="logo" />
        </a>
        <p>to a healthy life</p>
        <Navigation />
      </header>
      <div className="show-body">
        <h1 className="cap-first-letter"></h1>
        <p>Hi {userData && userData.displayName}</p>
        <p>Your target for today is {userData && userData.current}</p>
        <div>
          <dl className="list-unstyled">
            {foodData &&
              foodData.map((food) => {
                return (
                  <dt key={food.food_name}>
                    {food.food_name} had {food.nf_calories} calories
                    <img alt={food.food_name} src={food.photo.thumb}></img>
                  </dt>
                );
              })}
          </dl>
        </div>
        {/*<form onSubmit={handleSubmit(onSubmit)}>
                    What did you eat today?
                    <input name="example" defaultValue="test" ref={register} />
                
                
                
                    <input type="submit" />
                    </form> */}

        <form onSubmit={handleSubmit}>
          <label>
            What did you eat today?
            <br></br>
            <input type="text" value={foodQuery} onChange={handleChange} />
          </label>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default FoodMain;
