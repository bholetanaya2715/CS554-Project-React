import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Water from "./Components/Water";
import FoodMain from "./Components/food/foodMain";
import HomePage from "./Components/home/homePage";
import ErrorNotFound from "./Components/error/pageNotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from './Components/SignUp';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import SignIn from "./Components/SignIn";
import { AuthProvider } from './firebase/Auth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>This is a desperate attempt to code the 554 project</p>

          </header>

          <div className='App-body'>


            <Link className="App-link" to="/">
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
            </Link>


            <Switch>
              <Route path='/signup' exact component={SignUp}></Route>
              <Route path='/signin' exact component={SignIn}></Route>
              <Route path='/' exact component={HomePage}></Route>
              <Route path="/water" exact component={Water} />
              <Route path='/foodMain' exact component={FoodMain} />
              <Route component={ErrorNotFound}></Route>

            </Switch>
          </div>


        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
