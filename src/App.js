import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import GameBoard from './GameBoard';
import GameInstructions from './GameInstructions';
import PlayerInput from './PlayerInput'; 
import ResetButton from './ResetButton';

function App() {
  const [ gameBuild, setGameBuild ] = useState(null);

  // The board state is going to take a number (n) and create that number of n x n tiles. 
  // Each of those tiles will be represented by an object with an ID, value,  

  function initializeBoard(boardSize) {
    // Takes a number from an input component and sets state with boardSize: int.
    document.documentElement.style.setProperty('--boardSize',boardSize);
    const newGame = {
      boardSize: boardSize,
      gameInProgress: true,
    };
    setGameBuild( newGame ); 
  }

  function gameOver() {
    const endGame = {...gameBuild, gameInProgress: false};
    setGameBuild( endGame );
  }

  function resetGame() {
    setGameBuild(null); 
  }

  return (
    <>
      <Header/>
      <div className='board-container'>
        {boardSize ?
            <GameBoard boardSize={ boardSize } resetGame={ resetGame }/> :
            <PlayerInput initializeBoard={ initializeBoard } boardSize= { boardSize } />
        }
      </div>
    </>
  )
}

export default App;
