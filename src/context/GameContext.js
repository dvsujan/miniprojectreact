import React, { createContext, useReducer } from 'react';
import { gameReducer, initialState } from './gameReducer';

export const GameContext = createContext();
/**
 *  GameProvider is a component that wraps the entire application and provides the game state and dispatch function to its children components.
 * @param {*} param0 
 * @returns 
 */
export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};