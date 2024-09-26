import React from 'react'
import './square.css'
import { GameContext } from '../../GameContext';
import { useContext } from 'react';

const Square = (props) => {
  const { state, dispatch } = useContext(GameContext);
  const handleCellClick = (index) => {
    if (state.winner) {
      alert(`Game Over! ${state.winner} wins!`);
    };
    if (state.board[index] || state.isGameOver) return;
      dispatch({ type: 'MAKE_MOVE', payload: { index } });
  };
  
  return (
      <button 
          style={{width:'100px', height:'100px'}}
          className="square" 
          onClick={() => handleCellClick(props.idx)}
        >
          {props.cell}
        </button>
  )
}

export default Square
