import React from 'react'
import './square.css'
import { GameContext } from '../../GameContext';
import { useContext } from 'react';

const Square = (props) => {
  const { state, dispatch } = useContext(GameContext);
  const handleCellClick = (index) => {
    console.log('clicked', index);
    if (state.winner) {
      alert(`Game Over! ${state.winner} wins!`);
    };
    if (state.board[index] || state.isGameOver) return;
    dispatch({ type: 'MAKE_MOVE', payload: { index } });
  };

  return (
    <div>
      <button 
          style={{width:'100px', height:'100px'}}
          className="cell" 
          onClick={() => handleCellClick(props.idx)}
        >
          {props.cell}
        </button>
    </div>
  )
}

export default Square