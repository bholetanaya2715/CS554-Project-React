import React, { useContext } from "react";
import SocialSignIn from "./SocialSignin";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import {
  doSignInWithEmailAndPassword,
  doPasswordReset,
} from "../firebase/FirebaseFunctions";

function SignIn() {
  const { currentUser } = useContext(AuthContext);
  const handleLogin = async (event) => {
    event.preventDefault();
    let { email, password } = event.target.elements;

    try {
      await doSignInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  };
  if (currentUser) {
    return <Redirect to="/foodMain" />;
  }
  const passwordReset = async (event) => {
    event.preventDefault();
    let email = document.getElementById("email").value;
    if (email) {
      try {
        await doPasswordReset(email);
        alert("Password reset email has been sent! to your email Id");
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Please enter Email to reset the password");
    }
  };
  return (
    <div>
      <div>
        <h2>This is Sign in Page</h2>
      </div>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>
            Email:
            <input
              className="form-control"
              required
              name="email"
              type="email"
              id="email"
              placeholder="Email"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Password:
            <input
              className="form-control"
              id="password"
              required
              name="password"
              type="password"
              placeholder="Password"
            />
          </label>
        </div>
        <button id="submitButton" name="submitButton" type="submit">
          Sign In
        </button>
        <button classname="forgotPassword" onClick={passwordReset}>
          Forgot Password
        </button>
      </form>
      <br />
      <SocialSignIn />
    </div>
  );
}

export default SignIn;
