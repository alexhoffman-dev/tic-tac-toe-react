import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import GameBoard from './GameBoard';
import GameInstructions from './GameInstructions';
import PlayerInput from './PlayerInput'; 

function App() {
  const [ gameBuild, setGameBuild ] = useState(null);

  // the board state is going to take a number (n) and create that number of n x n tiles 
  // each of those tiles will be represented by an object with an ID, value,  

  function initializeBoard(boardSize) {
    // takes a number from an input component and sets state with boardSize:number 
    //setBoardState(...boardState, boardSize: number )
    document.documentElement.style.setProperty('--boardSize',boardSize);
    const newGame = {
      boardSize: boardSize,
      gameInProgress: true,
    };
    setGameBuild( newGame ); 
  }

  function gameOver() {
    const endGame = gameBuild;
    endGame.gameInProgress = false;
    setGameBuild( endGame );
  }

  return (
    <>
      <Header/>
      <GameInstructions gameBuild= { gameBuild }/>
      <PlayerInput initializeBoard={ initializeBoard } gameBuild= { gameBuild } />
      { gameBuild && <GameBoard boardSize={ gameBuild.boardSize } gameInProgress={ gameBuild.gameInProgress} gameOver={ gameOver }/>}
    </>

  );
}

export default App;
