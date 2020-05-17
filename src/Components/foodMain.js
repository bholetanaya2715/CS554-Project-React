import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../firebase/Auth";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Carousel, Modal, Container, Row, Col, Card, Button, Toast } from 'react-bootstrap';
import { CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



import Navigation from "./Navigation";
import logo from "../images/icon.png";

const FoodMain = (props) => {
  const [userData, setUserData] = useState(undefined);
  const [foodData, setFoodData] = useState(undefined);
  const [foodQuery, setFoodQuery] = useState("");
  const [message, setMessage] = useState(undefined);
  const [show, setShow] = useState(false);
  const [targetList, setTargetList] = useState([]);
  const [showError, setShowError] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { currentUser } = useContext(AuthContext);
  const userId = currentUser.providerData[0].email;

  var d = new Date();
  var date = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

  const errorMessage = (food) => {
    return <div>Cannot find information for {food}</div>;
  };

  const toggleMessage = () => {
    setMessage(null)
    setShowError(false)
  };

  const buildCarouselItem = (list) => {
		return (
      <Carousel.Item>
        <div className="d-block w-100 carousel-text">
          If you are {list.name} <br/>
          Your daily recommended calories are {list.cal} calories
        </div>
        <Carousel.Caption>
          Recommended by Utah.gov
        </Carousel.Caption>
      </Carousel.Item>
		);
  };
  
  const li =
    targetList &&
    targetList.map((show) => {
    return buildCarouselItem(show);
  });
  var circularBar;
  if(userData && userData.targetToBeAchieved){
    circularBar = <CircularProgressbar className="foodMain" styles={{path : {stroke: '#282c34'}, text : {fill : '#282c34',fontSize : '8px'}}}
                     value={(userData.targetToBeAchieved - userData.current)} maxValue={userData.targetToBeAchieved}
                     text={`${userData && parseInt(userData.current)} calories left!` }/>;
          
  }
  
  async function fetchData() {
    let token = await currentUser.getIdToken();
    const res = await fetch("http://localhost:8000/api/" + userId, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": "application/json",
        authtoken: token,
      },
    });
    res
      .json()
      .then((res) => {
        //incomplete code
        let BMR;
        let list = [];
        console.log("response is " + res);
        if (!res.height || !res.weight || !res.age || !res.gender) {
          setShow(true);
        }
        if(res.gender == "Female"){
          BMR = 655 + (4.3 * res.weight) + (4.7 * res.height) - (4.7 * res.age)
        }
        else if(res.gender == "Male"){
          BMR = 66 + (6.3 * res.weight) + (12.9 * res.height) - (6.8 * res.age)
        }
          list.push({"name" : "Sedentary (little or no exercise)", "cal" : parseInt(BMR*1.2)})
          list.push({"name" : "Lightly active (light exercise/sports 1-3 days/week)", "cal" : parseInt(BMR*1.375)})
          list.push({"name" : "Moderately active (moderate exercise/sports 3-5 days/week)", "cal" : parseInt(BMR*1.55)})
          list.push({"name" : "Very active (hard exercise/sports 6-7 days a week) ", "cal" : parseInt(BMR*1.2)})
          list.push({"name" : "Extra active (very hard exercise/sports & physical job or 2x training) ", "cal" : parseInt(BMR*1.9)})
          setTargetList(list);
        if (res.targetToBeAchieved == null) {
          res.targetToBeAchieved = BMR*1.55;
          updateTarget(res.userId, BMR*1.55);
          updateCurrent(res.userId, res.targetToBeAchieved);
        }
        if(res.current == null){
          updateCurrent(res.userId, res.targetToBeAchieved);
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
    let token = await currentUser.getIdToken();
    let payload = {
      id: res.userId,
      count: res.water.waterCurrent,
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
    const val = await axios(config);
  }

  async function getFoodData() {
    try {
      let token = await currentUser.getIdToken();
      const res = await fetch("http://localhost:8000/api/food/getFoodData", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": "application/json",
          authtoken: token,
        },
        body: JSON.stringify({
          foodQuery: foodQuery,
        }),
      });

      let response = await res.json();
      console.log("Response from routes is");
      console.log(response);
      console.log(response.name);
      if (response.foods) {
        setMessage(undefined);
        setFoodData(response.foods);
        updateFoodData(response.foods);
      }
      if (response.name == "Error") {
        console.log("in this condition");
        setMessage(errorMessage(foodQuery));
        setShowError(true)
      }
      console.log("foodData is");
      console.log(foodData);
    } catch (e) {
      console.log(e);
      setMessage(errorMessage(foodQuery));
    }
  }

  async function postFoodData(id, foodArr, target) {
    let token = await currentUser.getIdToken();
    console.log("foodData in postFoodData is");
    console.log(foodArr);
    const res = await fetch("http://localhost:8000/api/food", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": "application/json",
        authtoken: token,
      },
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
    let token = await currentUser.getIdToken();
    const res = await fetch("http://localhost:8000/api/food/updateTarget", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": "application/json",
        authtoken: token,
      },
      body: JSON.stringify({
        id: id,
        target: target,
      }),
    });
    let response = await res.json();
    setUserData(response);
  }

  async function updateCurrent(id, current) {
    let token = await currentUser.getIdToken();
    const res = await fetch("http://localhost:8000/api/food/updateCurrent", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": "application/json",
        authtoken: token,
      },
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
    <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="food-font">
              Hi ! Looks like you missed to fill in some information!
          </div>
          <br></br>
          
          <NavLink
            exact
            to="/account"
            activeClassName="active"
            className="showlink"
          >
            Please click here to fill in all the details
          </NavLink>
          
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>

      <header className="App-header">
        <a href="/">
          <img src={logo} className="App-logo" alt="logo" />
        </a>
        <p>to a healthy life</p>
        <Navigation />
      </header>

      <Container>
        <Row className="row-border">

          <Col md={8}>
            <strong className="head-font">Your daily target is currently set to {userData && userData.targetToBeAchieved} calories per day</strong>
            <br/>
            <div>
              Based on your height, weight, age and gender, the following recommendations are made
            </div>
            <Carousel className="carousel-style">
              {li}
            </Carousel>
            <NavLink
              exact
              to="/account"
              activeClassName="active"
              className="showlink"
              style={{ marginRight: "2px" }}
            >Click here to change your daily target
            </NavLink>
          </Col>

          <Col> 
              {circularBar}
          </Col>

        </Row>


        <Row>
          <Col md={4}></Col>
          <Col>
            {!message && foodData &&
              foodData.map((food) => {
                return(
                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={food.photo.thumb} alt={food.food_name}/>
                    <Card.Body>
                      <Card.Title>{food.food_name}</Card.Title>
                      <Card.Text>
                        {food.food_name} had {food.nf_calories} calories
                      </Card.Text>
                    </Card.Body>
                  </Card>
                );
            })}
            <form onSubmit={handleSubmit}>
                  <label className="food-font">
                      What did you eat today?
                      <br></br>
                      <input type="text" value={foodQuery} onChange={handleChange} placeholder="Blueberry cheesecake" />
                  </label>
                  <br></br>
                  <Button variant="dark" type="submit" value="Submit">Submit</Button>
            </form>
          </Col>
          <Col md={4}></Col>
        </Row>
        <Row>
          <Toast show={showError} onClose={toggleMessage}>
            <Toast.Header className="foodM">
              <div>Error !</div>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </Row>
      </Container>
      {/** 
      <div className='show-body'>
                <h1 className='cap-first-letter'></h1>
                <p>
                    Hi {userData && userData.displayName}
                </p>
                <p>
                    Your daily target is {userData && userData.targetToBeAchieved}
                    <br></br>
                    Click<NavLink
                        exact
                        to="/account"
                        activeClassName="active"
                        className="showlink"
                        style={{ marginRight: "2px" }}
                    >here
                    </NavLink>to change your daily target
                </p>
                <p>
                {userData && userData.current > 0 ? (
                    <div>Your target for today is {userData && userData.current}</div>
                ) : (
                    <div className="error-text">You've overrun your today's target by {userData && userData.current*-1} calories</div>
                )}
        
                </p>
                <div>
                  <ul className='list-unstyled'>{li}</ul>
                </div>
                <div>

                    

                    {message}

                </div>

                
            </div> */}
    </div>
  );
};

export default FoodMain;
