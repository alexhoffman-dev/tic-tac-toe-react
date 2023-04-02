import React, { useState } from 'react';
import Cell from './Cell';
import ResetButton from './ResetButton';
import PlayerPhrase from './PlayerPhrase';

const GameBoard = ({ boardSize, resetGame }) => {
    const [ gameBoard, setGameBoard ] = useState(createBoard(boardSize));
    const [ currentPlayer, setCurrentPlayer ] = useState('X'); 
    const [ playerUpPhrase, setPlayerUpPhrase ] = useState('It\'s X\'s Turn!'); 
    const [ gameInProgress, setGameInProgress ] = useState(true);

    function createBoard(boardSize) {
        const gameBoardData = [];
        for(let i = 0; i < boardSize; i++) {
            for(let j = 0; j < boardSize; j++) {
                let cellLocation = {
                    'index': `${(boardSize * i) + j}`,
                    'column':`${j}`,
                    'row':`${i}`,
                    'mark':'',
                    'isLeftDiagonal': i === j,
                    'isRightDiagonal': i + j + 1 === boardSize,
                };
                gameBoardData.push(cellLocation);
            }
        }
        return gameBoardData;
    }

    function makeAMark(index){
       // If that cell already has a mark, early return.
        if (gameBoard[index].mark || !gameInProgress) {
            return
        }
        // Otherwise, map the marked cell with the current player symbol.
        // Update state check for win/draw, toggle player.
        let updatedGameBoard = gameBoard.map( cell => { 
            return index.toString() === cell.index ? { ...cell, mark: currentPlayer } : cell; 
        });
        checkForWin(updatedGameBoard);
        setGameBoard(updatedGameBoard);
    }

    function togglePlayer() {
        const newCurrentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        setCurrentPlayer(newCurrentPlayer);
        setPlayerUpPhrase(`It's ${newCurrentPlayer}'s Turn!`);
    }

    function checkForWin(updatedGameBoard) {
        let gameWon = checkForAcrossWin(updatedGameBoard, 'column')
        || checkForAcrossWin(updatedGameBoard, 'row')
        || checkForDiagonalWin(updatedGameBoard);
        let isDraw = checkForDraw(updatedGameBoard);
        
        if (gameWon) {
            setPlayerUpPhrase(`${currentPlayer}'s Wins!`);
            setGameInProgress(false);
        } else if (isDraw) {
            setPlayerUpPhrase(`It's a Draw!`);
            setGameInProgress(false);
        } else {
            togglePlayer();
        }
    }

    // The Vertical and Horizontal win condition check functions reference shallow copies of gameBoard state arrays 
    // with matching row or column data, then check to see if they share the same 'mark' property.
    function checkForAcrossWin(updatedGameBoard, direction) {
        let hasWon = false;
        for(let i = 0; i < boardSize; i++) {
            let matchingAcross = updatedGameBoard.filter(cell => cell[direction] === `${i}`); 
            let matchingAcrossAndMark = matchingAcross.filter(matchedMark => matchedMark.mark === currentPlayer);
            if(matchingAcrossAndMark.length === boardSize) {
                hasWon = true;
                break;
            }
        }
        return hasWon;
    }

    function checkForDiagonalWin(updatedGameBoard) {
        let hasWon = false;
        let rightDiagonalCells = updatedGameBoard.filter(cell => cell.isRightDiagonal);
        let leftDiagonalCells = updatedGameBoard.filter(cell => cell.isLeftDiagonal);
        let isRightDiagonalWin = rightDiagonalCells.filter(win => win.mark === `${currentPlayer}`); 
        let isLeftDiagonalWin = leftDiagonalCells.filter(win => win.mark === `${currentPlayer}`); 
        if(isRightDiagonalWin.length === boardSize || isLeftDiagonalWin.length === boardSize) {
            hasWon = true;
        }
        return hasWon;
    }

    function checkForDraw(updatedGameBoard) {
        let hasWon = false;
        let noEmptyCells = updatedGameBoard.filter(nonEmpty => nonEmpty.mark === '');
        if(noEmptyCells.length === 0 && gameInProgress) {
            hasWon = true;
        }
        return hasWon;
    }

    return (
        <>  
            {gameInProgress &&
                <PlayerPhrase phrase={playerUpPhrase} />
            }
            <div className={ 'grid-container' }>
                {gameBoard.map(cell => (
                    <Cell key={cell.index} cell={cell} makeAMark={ makeAMark } checkForWin={ checkForWin }/>
                ))}
            </div>
            { !gameInProgress && 
                <ResetButton resetGame={resetGame} />
            }
        </>
    );
}

export default GameBoard;
