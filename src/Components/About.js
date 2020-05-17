import React, { useState, useEffect, useContext } from "react";
import Navigation from "./Navigation";
import logo from "../images/icon.png";

const About = () => {
  return (
    <div>
      <header className="App-header">
        <a href="/">
          <img src={logo} className="App-logo" alt="logo" />
        </a>
        <p>to a healthy life</p>
        <Navigation />
      </header>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>
          <b
            style={{
              fontWeight: 800,
            }}
          >
            How to Use
          </b>
        </p>
      </div>
      <div>
        <p
          style={{
            fontWeight: 400,
          }}
        >
          Water Module Lets you Track your Daily Water Intake - Set Daily Water
          Capacity and Increment everytime You actually drink water (Yeah it
          actually does that)
        </p>
        <p
          style={{
            fontWeight: 400,
          }}
        >
          Food Module is actually pretty cool, it gives you the calorie count of
          almost every food on the planet so you are self concious of what you
          eat (eat less oreos)
        </p>
        <p
          style={{
            fontWeight: 400,
          }}
        >
          Account Module has your details and you can edit most of them
        </p>
        <p
          style={{
            fontWeight: 400,
          }}
        >
          History will store all the data you entered and give you a sweet pdf
          out of it
        </p>
      </div>
      <div>
        <p>
          <b
            style={{
              fontWeight: 800,
            }}
          >
            About Us
          </b>
        </p>
        <p
          style={{
            fontWeight: 400,
          }}
        >
          This is our 554 Project and we worked too hard on this
        </p>
        <p>
          We think this idea is pretty cool because you will eat a lot in
          quarantine
        </p>
        <p
          style={{
            fontWeight: 400,
          }}
        >
          Some of the Technologies we used -
        </p>
        <ul>
          <li>React JS(Obviously)</li>
          <li>Node, Express, MongoDB and all that jazz</li>
          <li>Redis / Blurbird</li>
          <li>Axios</li>
          <li>Firebase</li>
          <li>pdfkit</li>
        </ul>
        <p>We did have a lot of fun and stress while working on this project</p>
      </div>
      <div>
        <p
          style={{
            fontWeight: 400,
          }}
        >
          Made with ♥ by Deep, Sejal, Parth, Malav, Kunj
        </p>
      </div>
    </div>
  );
};
export default About;
