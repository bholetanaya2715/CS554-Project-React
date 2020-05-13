import React, { useState, useEffect } from "react";
import "../App.css";
import CounterInput from "react-counter-input";
import axios from "axios";
import Button from "react-bootstrap/Button";

const Water = () => {
  const [waterNew, setWaterNew] = useState(undefined);
  const [waterCurrent, setWaterCurrent] = useState(undefined);
  const [waterCapCurrent, setWaterCapCurrent] = useState(undefined);
  const [waterCapNew, setWaterCapNew] = useState(undefined);
  const [waterOld, setWaterOld] = useState(undefined);
  const [timestamp, setTimestamp] = useState(undefined);

  var d = new Date();
  var date = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
  // console.log(date);

  useEffect(() => {
    console.log("render");
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/5e921850cba3c3ff5f6610ca"
        );

        if (data.water.timestamp !== date) {
          setTimestamp(data.water.timestamp);
          setWaterOld(data.water.waterCurrent);

          let payload = {
            id: "5e921850cba3c3ff5f6610ca",
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
        // console.log("logging from useeffect: ", waterCap);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [waterNew, waterCapNew, date]);

  async function handleClick(e) {
    e.preventDefault();
    let payload = {
      id: "5e921850cba3c3ff5f6610ca",
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

  async function handleClickCap(e) {
    e.preventDefault();
    let payload = { id: "5e921850cba3c3ff5f6610ca", count: waterCapNew };
    const val = await axios.post(
      "http://localhost:8000/api/water/cap",
      payload
    );

    setWaterCapCurrent(waterCapNew);
    setWaterCurrent(0);

    console.log("New Water Cap: ", val.data.water.waterGoal);
  }

  return (
    <div>
      <p>Water Code Would Go Here</p>
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
                }}
              />
            </div>
            {waterCapNew === waterCapCurrent ? (
              <p>Update Value</p>
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
                <b>Drinking Water</b>
              </p>
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
              <p>Update Value</p>
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

            <p>Water Had so far: {waterCurrent}</p>
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
              {timestamp === undefined || timestamp === date ? (
                <p></p>
              ) : (
                <p>
                  Last Goal on {timestamp} was {waterOld} cups out of{" "}
                  {waterCapCurrent}
                </p>
              )}
            </div>
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
            {waterCapNew === waterCapCurrent ? (
              <p>Update Value</p>
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

            <p>Water Cap for today: {waterCapCurrent}</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Water;
