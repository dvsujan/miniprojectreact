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
 * Helper Function which is used to calculate the draw condition 
 * @param {*} board 
 * @returns 
 */
export const CalculateDraw = (board) => {
  return board.every((cell) => cell !== null) && !calculateWinner(board);
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

/**
 *  Helper function to calculate the winner of the game
 * @param {*} board 
 * @returns 
 */
const calculateWinner = (board) => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};
