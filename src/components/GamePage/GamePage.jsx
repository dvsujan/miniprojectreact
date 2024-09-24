import React, {useEffect } from 'react'
import './gamepage.css'
import { GameContext } from '../../GameContext';
import { useContext } from 'react';
import { aiMove } from '../../gameReducer';
import Square from '../Square/Square';

const GamePage = (props) => {
  const { state, dispatch } = useContext(GameContext);

  useEffect(() => {
    if (props.aiplayer){
      const aiplayer = "O"; 
      dispatch({ type: 'ENABLE_AI', payload: { aiplayer }});
    }
  }, [dispatch]); 
  
  useEffect(() => {
    if (state.isAiEnabled && state.currentPlayer === state.aiPlayer && !state.isGameOver) {
      const aiMoveIndex = aiMove(state.board, state.aiPlayer, state.aiPlayer === 'X' ? 'O' : 'X');
      dispatch({ type: 'MAKE_MOVE', payload: { index: aiMoveIndex } });
    }
  }, [state.currentPlayer, state.isAiEnabled, state.isGameOver, dispatch]);

  return (
    <div className="board" style={{width:'100%', height:'100vh', display:'flex', alignItems:'center' , flexDirection:'row'}}>
      <div className="score">
        winner: {state.winner} 
      </div>
      {state.board.map((cell, index) => (
        <div>
          <Square idx={index} cell={cell} />
        </div>
 
      ))}
    </div>
  );
}

export default GamePage