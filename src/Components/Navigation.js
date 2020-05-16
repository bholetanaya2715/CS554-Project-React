import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import SignOutButton from "./SignOut";
import "../App.css";

const Navigation = () => {
  const { currentUser } = useContext(AuthContext);
  return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => (
  <div>
    <nav className="navigation">
      <NavLink
        exact
        to="/"
        activeClassName="active"
        className="showlink"
        style={{ marginRight: "10px" }}
      >
        Dashboard
      </NavLink>
      <NavLink
        exact
        to="/water"
        activeClassName="active"
        className="showlink"
        style={{ marginRight: "10px" }}
      >
        Water
      </NavLink>
      <NavLink
        exact
        to="/foodMain"
        activeClassName="active"
        className="showlink"
        style={{ marginRight: "10px" }}
      >
        Foodpage
      </NavLink>
      <NavLink
        exact
        to="/account"
        activeClassName="active"
        className="showlink"
        style={{ marginRight: "10px" }}
      >
        Account
      </NavLink>
      <NavLink
        exact
        to="/about"
        activeClassName="active"
        className="showlink"
        style={{ marginRight: "10px" }}
      >
        How to Use / About Us
      </NavLink>
      <NavLink
        exact
        to="/foodHistory"
        activeClassName="active"
        className="showlink"
        style={{ marginRight: "10px" }}
      >
        Food History
      </NavLink>
      <SignOutButton />
    </nav>
  </div>
);

const NavigationNonAuth = () => (
  <nav className="navigation">
    <NavLink
      exact
      to="/"
      activeClassName="active"
      className="showlink"
      style={{ marginRight: "10px" }}
    >
      Landing
    </NavLink>

    <NavLink
      exact
      to="/signin"
      activeClassName="active"
      className="showlink"
      style={{ marginRight: "10px" }}
    >
      Sign-In
    </NavLink>

    <NavLink
      exact
      to="/signup"
      activeClassName="active"
      className="showlink"
      style={{ marginRight: "10px" }}
    >
      Sign-up
    </NavLink>
  </nav>
);

export default Navigation;
