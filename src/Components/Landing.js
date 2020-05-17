import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../firebase/Auth";
import { NavLink, Redirect } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import "../App.css";
import axios from "axios";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import logo from "../images/icon.png";
import account from "../images/account.png";
import history from "../images/history.svg";
import food from "../images/food.png";
import waterlogo from "../images/water.png";
import waterDrop from "../images/raindrops.png";
import dish from "../images/dish.png";

import SignOutButton from "./SignOut";

function Landing() {
  const [waterCurrent, setWaterCurrent] = useState(undefined);
  const [waterCapCurrent, setWaterCapCurrent] = useState(undefined);
  const [foodCurrent, setfoodCurrent] = useState(undefined);
  const [foodCapCurrent, setfoodCapCurrent] = useState(undefined);
  const [userName, setUserName] = useState(undefined);

  var percentage = Math.ceil((waterCurrent / waterCapCurrent) * 100);
  var percentageFood = Math.ceil((foodCurrent / foodCapCurrent) * 100);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    console.log("render");
    async function fetchData() {
      try {
        if (currentUser == null) {
          setWaterCapCurrent(undefined);
          setWaterCurrent(undefined);
        } else {
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
          setWaterCapCurrent(data.water.waterGoal);
          setWaterCurrent(data.water.waterCurrent);
          setfoodCurrent(data.current);
          setfoodCapCurrent(data.targetToBeAchieved);
          setUserName(data.displayName);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [
    waterCurrent,
    waterCapCurrent,
    currentUser,
    userName,
    foodCapCurrent,
    foodCurrent,
  ]);

  if (currentUser == null) {
    return <Redirect to="/signin"></Redirect>;
  } else {
    return (
      <div>
        <header className="App-header">
          <a href="/">
            <img src={logo} className="App-logo" alt="logo" />
          </a>
          <p>to a healthy life</p>
          <p style={{ fontSize: "30px" }}>
            Hello {userName}! Welcome to your Dashboard
          </p>
        </header>

        <div style={{ marginTop: "30px" }}>
          <Container>
            <Row>
              <Col xs={6} md={6} sm={6} lg={3}>
                <NavLink
                  exact
                  to="/water"
                  activeClassName="active"
                  className="showlink"
                  style={{ marginRight: "10px" }}
                >
                  <Card>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Text>
                      {isNaN(percentage) === true ? (
                        <Card.Img
                          variant="top"
                          style={{ padding: "15px", width: 207, height: 207 }}
                          src={waterlogo}
                        />
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            width: 178,
                            height: 178,
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginBottom: "15px",
                            marginTop: "15px",
                          }}
                        >
                          <CircularProgressbarWithChildren value={percentage}>
                            <img
                              style={{ width: 40, marginTop: -5 }}
                              src={waterDrop}
                              alt="water logo"
                            />
                            <div style={{ fontSize: 20, marginTop: 15 }}>
                              <strong>{`${percentage}%`}</strong>
                            </div>
                          </CircularProgressbarWithChildren>
                        </div>
                      )}
                      <p>Total water had today</p>
                    </Card.Text>
                    <Card.Body>
                      <Card.Title>Water</Card.Title>
                    </Card.Body>
                  </Card>
                </NavLink>
              </Col>
              <Col xs={6} md={6} sm={6} lg={3}>
                <NavLink
                  exact
                  to="/foodMain"
                  activeClassName="active"
                  className="showlink"
                  style={{ marginRight: "10px" }}
                >
                  <Card>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Text>
                      {isNaN(percentageFood) === true ? (
                        <Card.Img
                          variant="top"
                          style={{ padding: "15px", width: 207, height: 207 }}
                          src={food}
                        />
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            width: 178,
                            height: 178,
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginBottom: "15px",
                            marginTop: "15px",
                          }}
                        >
                          <CircularProgressbarWithChildren
                            value={percentageFood}
                          >
                            <img
                              style={{ width: 40, marginTop: -5 }}
                              src={dish}
                              alt="dish logo"
                            />
                            <div style={{ fontSize: 20, marginTop: 15 }}>
                              <strong>{`${percentageFood}%`}</strong>
                            </div>
                          </CircularProgressbarWithChildren>
                        </div>
                      )}
                      <p>Total calories had today</p>
                    </Card.Text>
                    <Card.Body>
                      <Card.Title>Food</Card.Title>
                    </Card.Body>
                  </Card>
                </NavLink>
              </Col>
              <Col xs={6} md={6} sm={6} lg={3}>
                <NavLink
                  exact
                  to="/account"
                  activeClassName="active"
                  className="showlink"
                  style={{ marginRight: "10px" }}
                >
                  <Card>
                    <Card.Text>
                      <Card.Img
                        variant="top"
                        style={{ padding: "15px", width: 207, height: 207 }}
                        alt="account"
                        src={account}
                      />
                      <p>Edit Your Profile</p>
                    </Card.Text>

                    <Card.Body>
                      <Card.Title>Account Module</Card.Title>
                    </Card.Body>
                  </Card>
                </NavLink>
              </Col>
              <Col xs={6} md={6} sm={6} lg={3}>
                <NavLink
                  exact
                  to="/foodHistory"
                  activeClassName="active"
                  className="showlink"
                  style={{ marginRight: "10px" }}
                >
                  <Card>
                    <Card.Text>
                      <Card.Img
                        style={{ padding: "15px", width: 207, height: 207 }}
                        variant="top"
                        alt="history"
                        src={history}
                      />
                      <p>Check Your History</p>
                    </Card.Text>
                    <Card.Body>
                      <Card.Title>History Module</Card.Title>
                    </Card.Body>
                  </Card>
                </NavLink>
              </Col>
            </Row>
            <NavLink
              exact
              to="/about"
              activeClassName="active"
              className="showlink"
              style={{ marginRight: "10px" }}
            >
              <Card>
                <Card.Body>How to Use / About Us</Card.Body>
              </Card>
            </NavLink>
          </Container>
          <SignOutButton />
        </div>
      </div>
    );
  }
}

export default Landing;
