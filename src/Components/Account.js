import React, { useState, useEffect, useContext, Component } from "react";
import SignOutButton from "./SignOut";
import "../App.css";
import axios from "axios";
import ChangePassword from "./ChangePassword";
import { AuthContext } from "../firebase/Auth";
import Button from "react-bootstrap/Button";
import Navigation from "./Navigation";
import logo from "../images/icon.png";

function Account() {
  const { currentUser } = useContext(AuthContext);
  const [userHeight, setUserHeight] = useState(undefined);
  const [userWeight, setUserWeight] = useState(undefined);
  const [userTarget, setUserTarget] = useState(undefined); //Changes for target
  const [userAge, setUserAge] = useState(undefined); //Changes for age
  const [userGender, setUserGender] = useState(undefined); //Changes for gender

  const [userName, setUserName] = useState(undefined);
  const [pageState, setPageState] = useState(false);

  const [Butstate, setButState] = useState(false);

  useEffect(() => {
    console.log("render");
    async function fetchData() {
      try {
        let token = await currentUser.getIdToken();
        let config = {
          method: "get",
          url: "http://localhost:8000/api/" + String(currentUser.email),
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": "application/json",
            authtoken: token,
          },
        };
        const { data } = await axios(config);

        setUserHeight(data.height);
        setUserWeight(data.weight);
        setUserName(data.displayName);
        setUserTarget(data.targetToBeAchieved); //Changes for target
        setUserAge(data.age); //Changes for age
        setUserGender(data.gender); //Changes for age
        console.log(userGender);

        // console.log(userData);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [
    currentUser.email,
    userHeight,
    userWeight,
    userName,
    userTarget,
    pageState,
    userAge,
    userGender,
    currentUser,
  ]); //Changes for target, gender and age

  async function handleClickButState(e) {
    e.preventDefault();

    setButState(true);
    if (Butstate === true) {
      setButState(false);
    }
  }

  /** Changes for gender */
  async function onGenderChange(e) {
    setUserGender(e.target.value);
    console.log(e.target.value);
  }
  /** ----------------------- */

  const addInforamtion = async (event) => {
    event.preventDefault();
    let information = {};
    let { weight, height, target, age, gender } = event.target.elements; //Changes for target and age
    if (currentUser.displayName == null) {
      information = {
        userID: currentUser.email,
        displayName: "k",
        weightData: weight.value,
        heightData: height.value,
        targetData: target.value, //Changes for target
        ageData: age.value, //Changes for age
        genderData: gender.value, //Changes for gender
      };
    }
    //deep is commenting
    else {
      information = {
        userID: currentUser.email,
        displayName: currentUser.displayName,
        weightData: weight.value,
        heightData: height.value,
        targetData: target.value, //Changes for target
        ageData: age.value, //Changes for age
        genderData: userGender, //Changes for gender
      };
      console.log(information.genderData);
    }

    try {
      let token = await currentUser.getIdToken();
      let config = {
        method: "post",
        url: "http://localhost:8000/api/user/addInforamtion",
        data: information,
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": "application/json",
          authtoken: token,
        },
      };
      const { data } = await axios(config);

      alert("Value Updated!");
      setPageState(true);
      if (pageState == true) {
        setPageState(false);
      }
      this.forceUpdate();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      {userWeight === 0 || userWeight === undefined ? (
        <header className="App-header">
          <a href="/">
            <img src={logo} className="App-logo" alt="logo" />
          </a>
          <p>to a healthy life</p>
          <SignOutButton />
        </header>
      ) : (
        <header className="App-header">
          <a href="/">
            <img src={logo} className="App-logo" alt="logo" />
          </a>
          <p>to a healthy life</p>
          <Navigation />
        </header>
      )}

      <h2>{userName}</h2>
      <form onSubmit={addInforamtion}>
        <div className="form-group">
          <label>Email : </label>
          <label> {currentUser.email}</label>
        </div>
        {/* <div className="form-group">
          <label>Name : </label>
          <label> {userName}</label>
        </div> */}
        <div className="form-group">
          <label>
            Your Height (In cm):
            {userHeight === 0 || userHeight === undefined ? (
              <input
                min="1"
                className="form-control"
                id="height"
                required
                name="height"
                type="number"
                placeholder={userHeight}
              />
            ) : (
              <input
                min="1"
                className="form-control"
                id="height"
                defaultValue={userHeight}
                name="height"
                type="number"
                placeholder={userHeight}
              />
            )}
          </label>
        </div>
        <div className="form-group">
          <label>
            Your Weight (In Kg):
            {userWeight === 0 || userWeight === undefined ? (
              <input
                min="1"
                className="form-control"
                id="weight"
                required
                name="weight"
                type="number"
                placeholder={userWeight}
              />
            ) : (
              <input
                min="1"
                className="form-control"
                id="weight"
                defaultValue={userWeight}
                name="weight"
                type="number"
                placeholder={userWeight}
              />
            )}
          </label>
        </div>

        {/**------------------Changes made by Sejal-------------------- */}
        <div className="form-group">
          <label>
            Age :
            {userAge === 0 || userAge === undefined ? (
              <input
                min="1"
                className="form-control"
                id="age"
                required
                name="age"
                type="number"
                placeholder={userAge}
              />
            ) : (
              <input
                min="1"
                className="form-control"
                id="age"
                defaultValue={userAge}
                name="age"
                type="number"
                placeholder={userAge}
              />
            )}
          </label>
        </div>
        <div className="form-group">
          {userGender === "" ||
          userGender === null ||
          userGender === undefined ? (
            <label>
              Gender :
              <br />
              Female&nbsp;
              <input
                type="radio"
                name="gender"
                id="gender"
                required
                value={"Female"}
                onChange={onGenderChange}
              />
              &nbsp;&nbsp;&nbsp;&nbsp; Male&nbsp;
              <input
                type="radio"
                name="gender"
                required
                id="gender"
                value={"Male"}
                onChange={onGenderChange}
              />
            </label>
          ) : (
            <label>
              Gender :
              <br />
              Female&nbsp;
              <input
                type="radio"
                name="gender"
                id="gender"
                value={"Female"}
                onChange={onGenderChange}
              />
              &nbsp;&nbsp;&nbsp;&nbsp; Male&nbsp;
              <input
                type="radio"
                name="gender"
                id="gender"
                value={"Male"}
                onChange={onGenderChange}
              />
            </label>
          )}
        </div>
        <div className="form-group">
          <label>
            Your Target Calories per day :
            {userTarget === 0 ||
            userTarget === undefined ||
            userTarget === null ? (
              <input
                min="1"
                className="form-control"
                id="calorie"
                name="target"
                type="number"
                placeholder={userTarget}
              />
            ) : (
              <input
                min="1"
                className="form-control"
                id="calorie"
                defaultValue={userTarget}
                name="target"
                type="number"
                placeholder={userTarget}
              />
            )}
          </label>
          <br />
          Not sure of calories? Leave it blank for now!
        </div>
        {/**--------------------------------------------------------- */}
        <button id="submitButton" name="submitButton" type="submit">
          Add Information
        </button>
      </form>
      {/* <p>
        For security reasons (at the time) you need to add Height, Weight and
        Age everytime to change a single value
      </p> */}
      <Button
        variant="primary"
        style={{ marginBottom: "15px", marginTop: "15px" }}
        onClick={handleClickButState}
      >
        Update Password
      </Button>
      {Butstate === true ? (
        <div>
          <ChangePassword />
        </div>
      ) : (
        <p></p>
      )}

      {/* <SignOutButton /> */}
    </div>
  );
}

export default Account;
