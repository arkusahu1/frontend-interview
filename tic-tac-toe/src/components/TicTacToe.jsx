import React, { useState } from 'react';
import useTickTacToe from '../hooks/useTickTacToe';
import '../App.css';

export default function TicTacToe({ size = 3}) {

  const { board, handleClick, message, resetGame } = useTickTacToe(size);

  return (
    <div className='main'>
      <div className='header'>
        <span>{message}</span>
        <button onClick={resetGame}>Reset Game</button>
      </div>
      <div className='container' style={{ gridTemplateColumns: `repeat(${size}, 1fr)`}}>
        {board.map((item, index) => {
          return (
            <div onClick={() => handleClick(index)} className='container__item'>{item}</div>
          )
        })}
      </div>
    </div>
  );
}
