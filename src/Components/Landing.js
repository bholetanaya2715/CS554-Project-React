import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../firebase/Auth";
import { NavLink } from "react-router-dom";
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
import SignOutButton from "./SignOut";

function Landing() {
  const [waterCurrent, setWaterCurrent] = useState(undefined);
  const [waterCapCurrent, setWaterCapCurrent] = useState(undefined);
  const [userName, setUserName] = useState(undefined);

  var percentage = Math.ceil((waterCurrent / waterCapCurrent) * 100);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    console.log("render");
    async function fetchData() {
      try {
        if (currentUser == null) {
          setWaterCapCurrent(undefined);
          setWaterCurrent(undefined);
        } else {
          const { data } = await axios.get(
            "http://localhost:8000/api/" + String(currentUser.email)
          );
          setWaterCapCurrent(data.water.waterGoal);
          setWaterCurrent(data.water.waterCurrent);
          setUserName(data.displayName);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [waterCurrent, waterCapCurrent, currentUser, userName]);

  if (currentUser == null) {
    return (
      <div>
        <p>Login to access dashboard</p>
      </div>
    );
  } else {
    return (
      <div>
        <header className="App-header">
          <a href="/">
            <img src={logo} className="App-logo" alt="logo" />
          </a>
          <p>to a healthy life</p>
          <h3>Hello {userName}! Welcome to your Dashboard</h3>
        </header>

        <div style={{ marginTop: "30px" }}>
          <Container>
            <Row>
              <Col xs={4} md={3}>
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
                      <Card.Title>Water Module</Card.Title>
                    </Card.Body>
                  </Card>
                </NavLink>
              </Col>
              <Col xs={4} md={3}>
                <NavLink
                  exact
                  to="/foodMain"
                  activeClassName="active"
                  className="showlink"
                  style={{ marginRight: "10px" }}
                >
                  <Card>
                    <Card.Img
                      style={{ padding: "15px" }}
                      variant="top"
                      src={food}
                    />
                    <Card.Body>
                      <Card.Title>Food Module</Card.Title>
                    </Card.Body>
                  </Card>
                </NavLink>
              </Col>
              <Col xs={4} md={3}>
                <NavLink
                  exact
                  to="/account"
                  activeClassName="active"
                  className="showlink"
                  style={{ marginRight: "10px" }}
                >
                  <Card>
                    <Card.Img
                      style={{ padding: "25px" }}
                      variant="top"
                      src={account}
                    />
                    <Card.Body>
                      <Card.Title>Account Module</Card.Title>
                    </Card.Body>
                  </Card>
                </NavLink>
              </Col>
              <Col xs={4} md={3}>
                <NavLink
                  exact
                  to="/histroy"
                  activeClassName="active"
                  className="showlink"
                  style={{ marginRight: "10px" }}
                >
                  <Card>
                    <Card.Img
                      style={{ padding: "25px" }}
                      variant="top"
                      src={history}
                    />
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
