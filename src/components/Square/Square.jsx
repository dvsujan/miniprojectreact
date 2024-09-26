import React from 'react'
import './square.css'
import { GameContext } from '../../context/GameContext';
import { useContext } from 'react';
import PlaceSound from '../../Assets/place.wav'
import useSound from 'use-sound';

/**
 * function to render a single square on the board
 * @param {*} cell
 * @param {*} idx
 * @param {*} props 
 * @returns 
 */
const Square = (props) => {
  const { state, dispatch } = useContext(GameContext);
  const [play] = useSound(PlaceSound);
  /**
   * function to handle the click event on the square
   * @param {*} index
   */
  const handleCellClick = (index) => {
    if (state.winner) {
      alert(`Game Over! ${state.winner} wins!`);
    };

    if (state.board[index] || state.isGameOver) return;
      dispatch({ type: 'MAKE_MOVE', payload: { index } });
  };
  return (
    // button for the input 
      <button 
          style={{width:'100px', height:'100px'}}
          className="square" 
          onMouseDown={play}
          onClick={() => handleCellClick(props.idx)}
        >
          {props.cell}
        </button>
  )
}

export default Square
