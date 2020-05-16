import React from "react";
import { doSignOut } from "../firebase/FirebaseFunctions";
import "../App.css";
import Button from "react-bootstrap/Button";

const SignOutButton = () => {
  return (
    <button type="button" onClick={doSignOut} className="showlink">
      Sign Out
    </button>
  );
};

export default SignOutButton;
