/**
 *  Helper function to calculate the winner of the game
 * @param {*} board
 * @returns
 */
export const calculateWinner = (board) => {
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

/**
 * Helper Function which is used to calculate the draw condition
 * @param {*} board
 * @returns
 */
export const CalculateDraw = (board) => {
  return board.every((cell) => cell !== null) && !calculateWinner(board);
};
