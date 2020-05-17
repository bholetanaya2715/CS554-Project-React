import React from "react";
import { doSignOut } from "../firebase/FirebaseFunctions";
import "../App.css";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";

const SignOutButton = () => {
  return (
    <a href="/signin">
      <button type="button" onClick={doSignOut} className="showlink">
        Sign Out
      </button>
    </a>
  );

export default SignOutButton;
