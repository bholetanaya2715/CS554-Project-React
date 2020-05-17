import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import CounterInput from "react-counter-input";
import axios from "axios";
import { AuthContext } from "../firebase/Auth";
import Button from "react-bootstrap/Button";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Navigation from "./Navigation";
import logo from "../images/icon.png";

const Water = () => {
  const [waterNew, setWaterNew] = useState(undefined);
  const [waterCurrent, setWaterCurrent] = useState(undefined);
  const [waterCapCurrent, setWaterCapCurrent] = useState(undefined);
  const [waterCapNew, setWaterCapNew] = useState(undefined);
  const [waterOld, setWaterOld] = useState(undefined);
  const [timestamp, setTimestamp] = useState(undefined);
  const [Butstate, setButState] = useState(false);
  const { currentUser } = useContext(AuthContext);

  var d = new Date();
  var date = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
  var percentage = Math.ceil((waterCurrent / waterCapCurrent) * 100);
  // console.log(Int32((waterCurrent / waterCapCurrent) * 100));

  useEffect(() => {
    console.log("render");
    async function fetchData() {
      try {
        let token = await currentUser.getIdToken();
        const { data } = await axios.get(
          "http://localhost:8000/api/" + String(currentUser.email),
          {
            headers: {
              accept: "application/json",
              "Accept-Language": "en-US,en;q=0.8",
              "Content-Type": "multipart/form-data",
              authtoken: token,
            },
          }
        );

        if (data.water.timestamp !== date) {
          setTimestamp(data.water.timestamp);
          setWaterOld(data.water.waterCurrent);

          let payload = {
            id: currentUser.email,
            count: 0,
            timestamp: date,
          };

          let config = {
            method: "post",
            url: "http://localhost:8000/api/water/current",
            data: payload,
            headers: {
              accept: "application/json",
              "Accept-Language": "en-US,en;q=0.8",
              "Content-Type": "application/json",
              authtoken: token,
            },
          };
          const { val } = await axios(config);

          setWaterCurrent(0);
        }
        setWaterCapCurrent(data.water.waterGoal);

        setWaterCurrent(data.water.waterCurrent);
        // console.log(waterCapCurrent);
        // console.log("logging from useeffect: ", waterCap);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [
    waterNew,
    date,
    currentUser.email,
    waterCapCurrent,
    waterCapNew,
    currentUser,
  ]);

  async function handleClick(e) {
    e.preventDefault();
    let payload = {
      id: currentUser.email,
      count: waterNew,
      timestamp: date,
    };
    let token = await currentUser.getIdToken();

    let config = {
      method: "post",
      url: "http://localhost:8000/api/water/current",
      data: payload,
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": "application/json",
        authtoken: token,
      },
    };
    const { val } = await axios(config);

    setWaterCurrent(waterNew);
  }

  async function handleClickButState(e) {
    e.preventDefault();

    setButState(true);
    if (Butstate === true) {
      setButState(false);
    }
  }

  async function handleClickCap(e) {
    e.preventDefault();
    let token = await currentUser.getIdToken();
    let payload = { id: currentUser.email, count: waterCapNew };

    let config = {
      method: "post",
      url: "http://localhost:8000/api/water/cap",
      data: payload,
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": "application/json",
        authtoken: token,
      },
    };
    const { val } = await axios(config);

    setWaterCapCurrent(waterCapNew);
    setWaterCurrent(0);
    setButState(false);
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
      <div>
        {waterCapCurrent === 0 || waterCapCurrent === null ? (
          <div>
            <p>
              <b>Set New Total Number of Glasses</b>
            </p>
            <div className="outer">
              <CounterInput
                count={1}
                min={1}
                // max={10}
                onCountChange={(count) => {
                  setWaterCapNew(count);
                  // setWaterCapCurrent(waterCapNew);
                }}
              />
            </div>
            {!waterCapNew ||
            typeof waterCapNew === "undefined" ||
            waterCapNew === waterCapCurrent ||
            typeof waterCapCurrent === "undefined" ? (
              <p style={{ fontSize: "20px" }}>Update Value</p>
            ) : (
              <div>
                <p>
                  {" "}
                  <b
                    style={{
                      fontWeight: 400,
                    }}
                  >
                    New Glass Quantity: {waterCapNew}
                  </b>
                </p>

                <Button
                  variant="primary"
                  style={{ marginBottom: "15px" }}
                  onClick={handleClickCap}
                >
                  Confirm Quantity
                </Button>
              </div>
            )}

            <p>
              <b
                style={{
                  fontWeight: 400,
                }}
              >
                Current Number of Glasses Per Day is 0
              </b>
            </p>
          </div>
        ) : (
          <div>
            <div></div>
            <div>
              <p style={{ marginTop: "20px" }}>
                <b
                  style={{
                    fontSize: "30px",
                    fontWeight: 900,
                  }}
                >
                  Track your Daily Water Intake
                </b>
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: 200,
                height: 200,
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "15px",
                marginTop: "10px",
              }}
            >
              <CircularProgressbar value={percentage} text={`${percentage}%`} />
            </div>
            <div className="outer">
              <CounterInput
                count={waterCurrent}
                min={0}
                max={waterCapCurrent}
                onCountChange={(count) => {
                  setWaterNew(count);
                }}
              />
            </div>
            {waterNew === waterCurrent ? (
              <p style={{ fontSize: "20px" }}>Update Value</p>
            ) : (
              <div>
                <p style={{ fontSize: "20px" }}>
                  <b
                    style={{
                      fontWeight: 400,
                    }}
                  >
                    New Glass Quantity: {waterNew}
                  </b>
                </p>

                <Button
                  variant="primary"
                  style={{ marginBottom: "15px" }}
                  onClick={handleClick}
                >
                  Confirm Quantity
                </Button>
              </div>
            )}

            <p style={{ fontWeight: 700 }}>
              Glasses Had So Far: {waterCurrent}
            </p>
            <div>
              {waterCurrent === waterCapCurrent ? (
                <p>
                  <i>Congrats! Reached Daily Water Cap</i>
                </p>
              ) : (
                <p></p>
              )}
            </div>
            <div>
              {timestamp === undefined ||
              timestamp === date ||
              timestamp === "" ? (
                <p></p>
              ) : (
                <p>
                  Last Goal on {timestamp} was {waterOld} cups out of{" "}
                  {waterCapCurrent}
                </p>
              )}
            </div>
            <Button
              variant="primary"
              style={{ marginBottom: "15px" }}
              onClick={handleClickButState}
            >
              Update Water Capacity
            </Button>
            {Butstate === true ? (
              <div>
                <p>
                  <b>Water Capacity</b>
                </p>
                <div className="outer">
                  <CounterInput
                    count={waterCapCurrent}
                    min={0}
                    // max={10}
                    onCountChange={(count) => {
                      setWaterCapNew(count);
                    }}
                  />
                </div>
                {!waterCapNew ||
                typeof waterCapNew === "undefined" ||
                waterCapNew === waterCapCurrent ||
                typeof waterCapCurrent === "undefined" ? (
                  <p style={{ fontSize: "20px" }}> Update Value</p>
                ) : (
                  <div>
                    <p>
                      {" "}
                      <b
                        style={{
                          fontWeight: 400,
                        }}
                      >
                        {" "}
                        New Glass Quantity: {waterCapNew}
                      </b>
                    </p>

                    <Button
                      variant="primary"
                      style={{ marginBottom: "15px" }}
                      onClick={handleClickCap}
                    >
                      Confirm Quantity
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <p></p>
            )}

            <p style={{ fontWeight: 700 }}>
              Total Number of Glasses To Drink Today: {waterCapCurrent}
            </p>
          </div>
        )}
      </div>
      <p style={{ fontWeight: 500 }}>
        We recommend 8 to 10 glasses per day for a healthy lifestyle
      </p>
    </div>
  );
};
export default Water;
