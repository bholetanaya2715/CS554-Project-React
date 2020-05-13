import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from "../firebase/FirebaseFunctions";
import { AuthContext } from "../firebase/Auth";
import SocialSignIn from './SocialSignin'
import Axios from "axios";
function SignUp() {
  let { currentUser } = useContext(AuthContext);
  const [pwMatch, setpwMatch] = useState("");
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { displayName, email, passwordOne, passwordTwo } = e.target.elements;
    if (passwordOne.value !== passwordTwo.value) {
      setpwMatch('Password do not match');
      return false;
    }

    try {
      await doCreateUserWithEmailAndPassword(email.value, passwordOne.value, displayName.value)

      let temp = await Axios.post("http://localhost:8000/api/adduser", { email: email.value, userName: displayName.value })
      console.log(temp)

    } catch (error) {
      alert(error);
    }
  }
  if (currentUser) {
    console.log(currentUser)
    return <Redirect to='/account' />
  }
  return (
    <div>
      <h1>Sign Up page</h1>
      {pwMatch && <h4 className="error">{pwMatch}</h4>}
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label>
            Name:
            <input
              className="form-control"
              required
              name="displayName"
              type="text"
              placeholder="Name"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Email:
            <input
              className="form-control"
              required
              name="email"
              type="email"
              placeholder="Email"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Password:
            <input
              className="form-control"
              id="passwordOne"
              required
              name="passwordOne"
              type="password"
              placeholder="Password"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Confirm Password:
            <input
              className="form-control"
              id="passwordTwo"
              required
              name="confirm-password"
              type="password"
              placeholder="password"
            />
          </label>
        </div>
        <button id="submitButton" name="submitButton" type="submit">
          Sign Up
        </button>
      </form>
      <br />
      <SocialSignIn />
    </div>

  );
}

export default SignUp;
