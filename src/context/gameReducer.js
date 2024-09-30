import { CalculateDraw, calculateWinner } from "../util/util";

/**
 * inital state
 */
export const initialState = {
  board: Array(9).fill(null),
  currentPlayer: "X",
  winner: null,
  isGameOver: false,
  isDraw: false,
  scores: { X: 0, O: 0 },
  isAiEnabled: false,
  aiPlayer: "O",
  difficulty: false,
};


/**
 * Reducer function for the game
 * @param {*} state
 * @param {*} action
 * @returns
 */
export const gameReducer = (state, action) => {
  switch (action.type) {
    case "MAKE_MOVE":
      const newBoard = state.board.map((cell, idx) =>
        idx === action.payload.index ? state.currentPlayer : cell
      );
      const winner = calculateWinner(newBoard);
      const isDraw = CalculateDraw(newBoard);
      if (winner) {
        state.scores[winner] += 1;
      }
      return {
        ...state,
        board: newBoard,
        currentPlayer: state.currentPlayer === "X" ? "O" : "X",
        winner: winner,
        scores: state.scores,
        isDraw: isDraw,
        isGameOver: winner || !newBoard.includes(null),
      };
    case "ENABLE_AI":
      return {
        ...state,
        isAiEnabled: true,
        aiPlayer: action.payload.aiPlayer || "O",
        difficulty: action.payload.difficulty || false,
      };
    case "SET_DIFFICULTY":
      return {
        ...state,
        scores: { X: 0, O: 0 },
        difficulty: action.payload.difficulty,
      };
    case "RESET_GAME":
      return {
        ...state,
        board: Array(9).fill(null),
        currentPlayer: "X",
        winner: null,
        isGameOver: false,
      };
    default:
      return state;
  }
};
