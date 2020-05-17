import React, { useContext } from "react";
import SocialSignIn from "./SocialSignin";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import {
  doSignInWithEmailAndPassword,
  doPasswordReset,
} from "../firebase/FirebaseFunctions";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from "reactstrap";
import ExamplesNavbar from "./Navbars/ExamplesNavbar.js";
import TransparentFooter from "./Footers/TransparentFooter.js";

function SignIn() {
  const { currentUser } = useContext(AuthContext);
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
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
    return <Redirect to="/" />;
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
    <>
      <ExamplesNavbar />
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("../assets/img/login.jpg") + ")",
          }}
        ></div>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <form onSubmit={handleLogin}>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        required
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="password"
                        required
                        name="password"
                        type="password"
                        placeholder="Password"
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      size="lg"
                      id="submitButton"
                      name="submitButton"
                      type="submit"
                    >
                      Sign In
                    </Button>
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      onClick={passwordReset}
                      size="lg"
                    >
                      Forgot password
                    </Button>
                    <SocialSignIn />
                  </CardFooter>
                </form>
              </Card>
            </Col>
          </Container>
        </div>
        <TransparentFooter />
      </div>
      {/* 
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
      </div> */}
    </>
  );
}

export default SignIn;
