import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import GameBoard from './GameBoard';
import GameInstructions from './GameInstructions';
import PlayerInput from './PlayerInput'; 

function App() {
  const [ gameBuild, setGameBuild ] = useState(null);

  // The board state is going to take a number (n) and create that number of n x n tiles. 
  // Each of those tiles will be represented by an object with an ID, value,  

  function initializeBoard(boardSize) {
    // Takes a number from an input component and sets state with boardSize: int.
    // setBoardState(...boardState, boardSize: number )
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

  return (
    <>
      <Header/>
      <div className='board-container'>
        <GameInstructions gameBuild= { gameBuild }/>
        <PlayerInput initializeBoard={ initializeBoard } gameBuild= { gameBuild } />
        { gameBuild &&
          <GameBoard boardSize={ gameBuild.boardSize } gameInProgress={ gameBuild.gameInProgress} gameOver={ gameOver }/>
        }
      </div> 
    </>
  );
}

export default App;
