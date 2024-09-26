import React, { useContext } from "react";
import "./landingpage.css";
import Lottie from "lottie-react";
import TicAnimation from "../../Assets/ticanimation.json";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-left">
        <div className="landing-content">
          <h1>Master the Grid with Ultimate Tic-Tac-Toe</h1>
          <p>Unleash your Inner TicTacToe expert either by playing player vs player or with the robot</p>
          <span>
            <a href="/2pgame">Player vs Player </a>
            <a href="/aigame">Player vs ai </a>
          </span>
        </div>
      </div>
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
