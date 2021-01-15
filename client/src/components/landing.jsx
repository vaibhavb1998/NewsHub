import React, { useState } from "react";
import "../style/landing.css";
import bgImage from "../assets/landingBg.svg";

const Landing = () => {
  return (
    <div className="container">
      <div className="navbar">
        <h1>NewsHub</h1>
        <div className="navbar-btn">
          <div style={{ marginRight: "50px" }}>
            <a href="./login">Login</a>
          </div>
          <div>
            <a href="./register">Register</a>
          </div>
        </div>
      </div>
      <div className="main-section">
        <div className="left-section">
          <div>
            <h1>Check the latest news</h1>
            <h2>at one place anytime, anywhere</h2>
            <a href="./register">
              <button>Get Started</button>
            </a>
          </div>
        </div>
        <div className="right-section">
          <img src={bgImage} />
        </div>
      </div>
    </div>
  );
};

export default Landing;
