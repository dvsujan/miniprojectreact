import React, { useContext } from "react";
import "./landingpage.css";
import Lottie from "lottie-react";
import TicAnimation from "../../Assets/ticanimation.json";

const LandingPage = () => {
  return (
    // landing page container
    <div className="landing-page">
      {/* landing page left side content */}
      <div className="landing-left">
        {/* landing page content */}
        <div className="landing-content">
          <h1>Master the Grid with Ultimate Tic-Tac-Toe</h1>
          <p>Unleash your Inner TicTacToe expert  by playing player vs player or with the robot</p>
          <span>
            <a href="/2pgame">Player vs Player </a>
            <a href="/aigame">Player vs ai </a>
          </span>
        </div>
      </div>
      {/* landing page left side content */}
      <div className="landing-right">
        <Lottie
          animationData={TicAnimation}
          autoplay={true}
          loop={true}
          className="landing-animation"
        />
      </div>
    </div>
  );
};

export default LandingPage;
