import React, { useState, useEffect, useContext, Component } from "react";
import logo from "./icon.png";
import "./App.css";
import Water from "./Components/Water";
import FoodMain from "./Components/foodMain";
import HomePage from "./Components/homePage";
import ErrorNotFound from "./Components/pageNotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./Components/SignUp";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import SignIn from "./Components/SignIn";
import { AuthProvider } from "./firebase/Auth";
import ChangePassword from "./Components/ChangePassword";
import Navigation from "./Components/Navigation";
import PrivateRoute from "./Components/PrivateRoutes";
import Landing from "./Components/Landing";
import Account from "./Components/Account";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Hello, welcome aboard to a healthy life</p>
            <Navigation />
          </header>

          <div className="App-body">
            {/* <Link className="App-link" to="/">
              Home
            </Link>
            <Link className="App-link" to="/water">
              Water
            </Link>
            <Link className='App-Button' to='/foodMain'>
              Food Page
            </Link>
            <Link className='App-Button' to='/signup'>
              Sign Up
            </Link> */}
            {/* Deep Kakadia- Above routes are shifted to Navigation.js */}

            <Switch>
              <Route exact path="/" exact component={Landing}></Route>
              <PrivateRoute exact path="/home" exact component={HomePage} />
              <Route path="/signup" component={SignUp}></Route>
              <Route path="/signin" component={SignIn}></Route>

              <PrivateRoute path="/water" exact component={Water} />
              <PrivateRoute path="/foodMain" exact component={FoodMain} />
              <PrivateRoute path="/account" exact component={Account} />

              <Route component={ErrorNotFound}></Route>
            </Switch>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
