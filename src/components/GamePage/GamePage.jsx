import React, { useEffect } from "react";
import "./gamepage.css";
import { GameContext } from "../../context/GameContext";
import { useContext } from "react";
import { aiMove } from "../../context/gameReducer";
import Square from "../Square/Square";

/**
 *  function to render the Game Page
 * @param {*} props 
 * @returns 
 */
const GamePage = (props) => {
  const { state, dispatch } = useContext(GameContext);
  /**
   * function to enable the ai player based on props
   */
  useEffect(() => {
    if (props.aiplayer) {
      const aiplayer = "O";
      dispatch({ type: "ENABLE_AI", payload: { aiplayer } });
    }
  }, [dispatch]);

  /**
   * function to handle the game logic
   */
  useEffect(() => {
    if (state.winner) {
      alert(`Player ${state.winner} wins!`);
    }
    if (state.isDraw) {
      alert("It's a draw!");
      dispatch({ type: "RESET_GAME" });
    }
    if (
      state.isAiEnabled &&
      state.currentPlayer === state.aiPlayer &&
      !state.isGameOver
    ) {
      const aiMoveIndex = aiMove(
        state.board,
        state.aiPlayer,
        state.aiPlayer === "X" ? "O" : "X"
      );
      const timer = setTimeout(() => {
        const aiMoveIndex = aiMove(
          state.board,
          state.aiPlayer,
          state.difficulty
        );
        dispatch({ type: "MAKE_MOVE", payload: { index: aiMoveIndex } });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [state.currentPlayer, state.isAiEnabled, state.isGameOver, dispatch]);
 
  /**
   * function to handle the toggle of difficulty
   * @returns
   */
  const handleToggleDifficulty = () => {
    const diff = !state.difficulty;
    if (state.board.every((cell) => cell === null)) {
      dispatch({ type: "SET_DIFFICULTY", payload: { difficulty: diff } });
    } else {
      alert("Cannot change difficulty while the game is in progress");
    }
  };

  return (
    <div className="board-page">
      <div className="board-score">
        <p className="score-p">
          {props.aiplayer && <>Difficulty:</>}{" "}

          <strong >
            {props.aiplayer && state.difficulty
              ? "Hard"
              : props.aiplayer && !state.difficulty
              ? "Easy"
              : ""}
          </strong>
        </p>
        <p className="score-p">
          {!props.aiplayer && <>Current Player:</>}
          <strong>{!props.aiplayer&&state.currentPlayer}</strong>
        </p>
        <br></br>
        {!props.aiplayer ? (
          <p className="score-p">
            P1 Score:<strong>{state.scores.X}</strong> P2 Score:
            <strong>{state.scores.O}</strong>
          </p>
        ) : (
          <p className="score-p">
            Your Score: <strong>{state.scores.X} </strong>AI Score:{" "}
            <strong>{state.scores.O}</strong>
          </p>
        )}
      </div>

      <div className="board">
        {state.board.map((cell, index) => (
          <div>
            <Square idx={index} cell={cell} />
          </div>
        ))}
      </div>
      <div className="board-buttons">
        <button onClick={() => dispatch({ type: "RESET_GAME" })}>
          Play Again
        </button>
        {props.aiplayer && (
          <button onClick={handleToggleDifficulty}>Toggle Ai Difficulty</button>
        )}
      </div>
    </div>
  );
};

export default GamePage;
