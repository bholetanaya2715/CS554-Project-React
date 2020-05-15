import React, { useState, useEffect, useContext, Component } from "react";
import SignOutButton from "./SignOut";
import "../App.css";
import axios from "axios";
import ChangePassword from "./ChangePassword";
import { AuthContext } from "../firebase/Auth";
import Button from "react-bootstrap/Button";

function Account() {
  const { currentUser } = useContext(AuthContext);
  const [userHeight, setUserHeight] = useState(undefined);
  const [userWeight, setUserWeight] = useState(undefined);
  const [userName, setUserName] = useState(undefined);

  const [Butstate, setButState] = useState(false);

  useEffect(() => {
    console.log("render");
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/" + String(currentUser.email)
        );

        setUserHeight(data.height);
        setUserWeight(data.weight);
        setUserName(data.displayName);

        // console.log(userData);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [currentUser.email, userHeight, userWeight, userName]);

  async function handleClickButState(e) {
    e.preventDefault();

    setButState(true);
    if (Butstate === true) {
      setButState(false);
    }
  }

  const addInforamtion = async (event) => {
    event.preventDefault();
    let information = {};
    let { weight, height } = event.target.elements;
    if (currentUser.displayName == null) {
      information = {
        userID: currentUser.email,
        displayName: "k",
        weightData: weight.value,
        heightData: height.value,
      };
    }
    //deep is commenting
    else {
      information = {
        userID: currentUser.email,
        displayName: currentUser.displayName,
        weightData: weight.value,
        heightData: height.value,
      };
    }

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/user/addInforamtion",
        information
      );
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <h2>Account Page</h2>
      <form onSubmit={addInforamtion}>
        <div className="form-group">
          <label>Email : </label>
          <label> {currentUser.email}</label>
        </div>
        <div className="form-group">
          <label>Name : </label>
          <label> {userName}</label>
        </div>
        <div className="form-group">
          <label>
            Your Height (In cm):
            <input
              className="form-control"
              id="height"
              required
              name="height"
              type="number"
              placeholder={userHeight}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Your Weight (In Kg):
            <input
              className="form-control"
              id="weight"
              required
              name="weight"
              type="number"
              placeholder={userWeight}
            />
          </label>
        </div>
        <button id="submitButton" name="submitButton" type="submit">
          Add Information
        </button>
      </form>
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
