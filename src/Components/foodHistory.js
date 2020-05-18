import { Line } from "react-chartjs-2";
import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import { AuthContext } from "../firebase/Auth";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Navigation from "./Navigation";
import logo from "../images/icon.png";
import { VictoryBar, VictoryChart } from "victory";

const FoodHistory = () => {
  const { currentUser } = useContext(AuthContext);

  const [chartData, setchartData] = useState();

  useEffect(() => {
    console.log("render");
    async function fetchData() {
      try {
        let token = await currentUser.getIdToken();
        const { data } = await axios.get(
          "http://localhost:8000/api/chart/" + String(currentUser.email),
          {
            headers: {
              accept: "application/json",
              "Accept-Language": "en-US,en;q=0.8",
              "Content-Type": "multipart/form-data",
              authtoken: token,
            },
          }
        );
        setchartData(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  async function createPdf(e) {
    e.preventDefault();
    const val = await axios.post(
      "http://localhost:8000/api/pdf/" + String(currentUser.email)
    );
    window.open("http://localhost:8000/api/pdf/" + String(currentUser.email));
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
      <div style={{ width: "700px", heigh: "700px", align: "center" }}>
        <VictoryChart>
          <VictoryBar
            domain={{ y: [0, 1000] }}
            data={chartData}
            alignment="start"
            x="consumedAt"
            y="calories"
          />
        </VictoryChart>
      </div>
      <div>
        <Button
          variant="primary"
          style={{ marginBottom: "15px" }}
          onClick={createPdf}
        >
          Create PDF
        </Button>
      </div>
    </div>
  );
};

export default FoodHistory;
