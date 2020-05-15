import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import CounterInput from "react-counter-input";
import axios from "axios";
import { AuthContext } from "../firebase/Auth";
import Button from "react-bootstrap/Button";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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
        const { data } = await axios.get(
          "http://localhost:8000/api/" + String(currentUser.email)
        );

        if (data.water.timestamp !== date) {
          setTimestamp(data.water.timestamp);
          setWaterOld(data.water.waterCurrent);

          let payload = {
            id: currentUser.email,
            count: 0,
            timestamp: date,
          };
          const val = await axios.post(
            "http://localhost:8000/api/water/current",
            payload
          );
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
  }, [waterNew, date, currentUser.email, waterCapCurrent, waterCapNew]);

  async function handleClick(e) {
    e.preventDefault();
    let payload = {
      id: currentUser.email,
      count: waterNew,
      timestamp: date,
    };
    const val = await axios.post(
      "http://localhost:8000/api/water/current",
      payload
    );

    setWaterCurrent(waterNew);
    console.log("New Water: ", val.data.water.waterCurrent);
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
    let payload = { id: currentUser.email, count: waterCapNew };
    const val = await axios.post(
      "http://localhost:8000/api/water/cap",
      payload
    );

    setWaterCapCurrent(waterCapNew);
    setWaterCurrent(0);
    setButState(false);
    console.log("New Water Cap: ", val.data.water.waterGoal);
  }

  return (
    <div>
      <div>
        {waterCapCurrent === 0 || waterCapCurrent === null ? (
          <div>
            <p>
              <b>Set New Water Capacity</b>
            </p>
            <div className="outer">
              <CounterInput
                count={1}
                min={1}
                // max={10}
                onCountChange={(count) => {
                  setWaterCapNew(count);
                  setWaterCapCurrent(count);
                }}
              />
            </div>
            {!waterCapNew ||
            typeof waterCapNew === "undefined" ||
            waterCapNew === waterCapCurrent ||
            typeof waterCapCurrent === "undefined" ? (
              <p style={{ fontSize: "20px", fontWeight: 900 }}>Update Value</p>
            ) : (
              <div>
                <p>New Water Cap: {waterCapNew}</p>

                <Button
                  variant="primary"
                  style={{ marginBottom: "15px" }}
                  onClick={handleClickCap}
                >
                  Confirm Quantity
                </Button>
              </div>
            )}

            <p>Current Water Cap is 0</p>
          </div>
        ) : (
          <div>
            <div></div>
            <div>
              <p>
                <b style={{ fontSize: "30px", fontWeight: 900 }}>
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
              <p style={{ fontSize: "20px", fontWeight: 900 }}>Update Value</p>
            ) : (
              <div>
                <p>New Water: {waterNew}</p>

                <Button
                  variant="primary"
                  style={{ marginBottom: "15px" }}
                  onClick={handleClick}
                >
                  Confirm Quantity
                </Button>
              </div>
            )}

            <p style={{ fontWeight: 700 }}>Water Had so far: {waterCurrent}</p>
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
                  <p style={{ fontSize: "20px", fontWeight: 900 }}>
                    {" "}
                    Update Value
                  </p>
                ) : (
                  <div>
                    <p>New Water Cap: {waterCapNew}</p>

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
              Water Cap for today: {waterCapCurrent}
            </p>
          </div>
        )}
      </div>
      <p>We recommend 8 to 10 glasses per day for a healthy lifestyle</p>
    </div>
  );
};
export default Water;
