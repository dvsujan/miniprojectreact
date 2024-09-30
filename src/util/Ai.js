import { CalculateDraw , calculateWinner } from "./util";

/**
 * returns the index of the board based on the difficulty of the ai
 * @param {*} board
 * @param {*} aiPlayer
 * @param {*} difficulty
 * @returns
 */
export const aiMove = (board, aiPlayer, difficulty) => {
  if (difficulty) {
    return minimaxMove(board, aiPlayer);
  } else {
    return randomMove(board);
  }
};

/**
 * function returns the random index from the board
 * @param {*} board
 * @returns
 */
const randomMove = (board) => {
  const availableMoves = board
    .map((cell, index) => (cell === null ? index : null))
    .filter((index) => index !== null);
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
};

/**
 * function returns the best move for the ai based on the minimax algorithm
 * @param {*} board
 * @param {*} aiPlayer
 * @returns
 */
const minimaxMove = (board, aiPlayer) => {
  const humanPlayer = aiPlayer === "X" ? "O" : "X";
  let bestScore = -Infinity;
  let bestMove;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = aiPlayer;
      let score = minimax(board, 0, false, aiPlayer, humanPlayer);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
};

/**
 *  Helper function for the minimax algorithm
 * @param {*} board
 * @param {*} winner
 * @param {*} board
 * @param {*} depth
 * @param {*} isMaximizing
 * @param {*} aiPlayer
 * @param {*} humanPlayer
 * @returns
 */
const minimax = (board, depth, isMaximizing, aiPlayer, humanPlayer) => {
  const winner = calculateWinner(board);
  if (winner === aiPlayer) return 10 - depth;
  if (winner === humanPlayer) return depth - 10;
  if (CalculateDraw(board)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = aiPlayer;
        let score = minimax(board, depth + 1, false, aiPlayer, humanPlayer);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = humanPlayer;
        let score = minimax(board, depth + 1, true, aiPlayer, humanPlayer);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};
