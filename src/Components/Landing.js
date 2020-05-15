import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../firebase/Auth";
import { NavLink } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import "../App.css";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Landing() {
  // const [waterCurrent, setWaterCurrent] = useState(undefined);
  // const [waterCapCurrent, setWaterCapCurrent] = useState(undefined);
  // var percentage = Math.ceil((waterCurrent / waterCapCurrent) * 100);
  // const { currentUser } = useContext(AuthContext);

  // useEffect(() => {
  //   console.log("render");
  //   async function fetchData() {
  //     try {
  //       const { data } = await axios.get(
  //         "http://localhost:8000/api/" + String(currentUser.email)
  //       );
  //       setWaterCapCurrent(data.water.waterGoal);
  //       setWaterCurrent(data.water.waterCurrent);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   fetchData();
  // }, [currentUser.email, waterCurrent, waterCapCurrent]);

  return (
    <div>
      <h2>This is the Landing page</h2>
      <div>
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
                    {/* <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: 200,
                        height: 200,
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginBottom: "15px",
                      }}
                    > */}
                    {/* <CircularProgressbar
                      value={percentage}
                      text={`${percentage}%`}
                    />
                    <p>Total water had today</p> */}
                    {/* </div> */}
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
                  <Card.Img variant="top" src="holder.js/100px180" />
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
                  <Card.Img variant="top" src="holder.js/100px180" />
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
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Title>Histroy Module</Card.Title>
                  </Card.Body>
                </Card>
              </NavLink>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Landing;
