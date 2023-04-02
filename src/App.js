import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import GameBoard from './GameBoard';
import GameInstructions from './GameInstructions';
import PlayerInput from './PlayerInput'; 

function App() {
  const [ boardSize, setBoardSize ] = useState(null);

  // The board state is going to take a number (n) and create that number of n x n tiles. 
  // Each of those tiles will be represented by an object with an ID, value, etc.
  function initializeBoard(boardSize) {
    // Takes a number from an input component and sets state with boardSize: int.
    document.documentElement.style.setProperty('--boardSize', boardSize);
    setBoardSize( boardSize ); 
  }

  function resetGame() {
    setBoardSize(null); 
  }

  return (
    <>
      <Header/>
      <div className='board-container'>
        <GameInstructions boardSize= { boardSize }/>
        {boardSize ?
            <GameBoard boardSize={ boardSize } resetGame={ resetGame }/> :
            <PlayerInput initializeBoard={ initializeBoard } boardSize= { boardSize } />
        }
      </div>
    </>
  );
}

export default App;
