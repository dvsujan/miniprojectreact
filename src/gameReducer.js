export const aiMove = (board) => {
  const availableMoves = board
    .map((cell, index) => (cell === null ? index : null))
    .filter((index) => index !== null);

  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  
  return availableMoves[randomIndex];
};

export const initialState = {
  board: Array(9).fill(null),
  currentPlayer: "X",
  winner: null,
  isGameOver: false,
  scores: { X: 0, O: 0 },
  isAiEnabled: false,
  aiPlayer: "O",
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case "MAKE_MOVE":
      const newBoard = state.board.map((cell, idx) =>
        idx === action.payload.index ? state.currentPlayer : cell
      );

      const winner = calculateWinner(newBoard);
      
      return {
        ...state,
        board: newBoard,
        currentPlayer: state.currentPlayer === "X" ? "O" : "X",
        winner:winner,
        isGameOver: winner || !newBoard.includes(null),
      };
      
      case "ENABLE_AI":
      return {
        ...state,
        isAiEnabled: true,
        aiPlayer: action.payload.aiPlayer || "O",
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
