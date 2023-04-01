import React, { useState } from 'react';
import Cell from './Cell';
import PlayerPhrase from './PlayerPhrase';

const GameBoard = ({ boardSize, gameInProgress, gameOver }) => {
    const [ gameBoard, setGameBoard ] = useState(createBoard(boardSize));
    const [ currentPlayer, setCurrentPlayer ] = useState('X'); 
    const [ playerUpPhrase, setPlayerUpPhrase ] = useState(); 

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
        if (currentPlayer === 'X') {
            setCurrentPlayer('O');
        } else {
            setCurrentPlayer('X')
        };
    }

    function checkForWin(updatedGameBoard) {
        checkForAcrossWin(updatedGameBoard,'column');
        checkForAcrossWin(updatedGameBoard,'row');
        checkForDiagonalWin(updatedGameBoard);
        checkForDraw(updatedGameBoard); 
        togglePlayer();
    }

    // The Vertical and Horizontal win condition check functions reference shallow copies of gameBoard state arrays 
    // with matching row or column data, then check to see if they share the same 'mark' property

    function checkForAcrossWin(updatedGameBoard, direction) {
        for(let i=0; i < boardSize; i++) {
            let matchingAcross = updatedGameBoard.filter(match => match[direction] === `${i}`); 
            let matchingAcrossAndMark = matchingAcross.filter(matchedMark => matchedMark.mark === `${currentPlayer}`);
            if(matchingAcrossAndMark.length === boardSize) {
                gameOver();
                setPlayerUpPhrase(`${currentPlayer}'s Wins!`);
                break;
            }
        }
    }

    function checkForDiagonalWin(updatedGameBoard) {
        let rightDiagonalCells = updatedGameBoard.filter(cell => cell.isRightDiagonal);
        let leftDiagonalCells = updatedGameBoard.filter(cell => cell.isLeftDiagonal);
        let isRightDiagonalWin = rightDiagonalCells.filter(win => win.mark === `${currentPlayer}`); 
        let isLeftDiagonalWin = leftDiagonalCells.filter(win => win.mark === `${currentPlayer}`); 
        if(isRightDiagonalWin.length === boardSize || isLeftDiagonalWin.length === boardSize) {
            gameOver();
            setPlayerUpPhrase(`${currentPlayer}'s Wins!`);
        }
    }

    function checkForDraw(updatedGameBoard) {
        let noEmptyCells = updatedGameBoard.filter(nonEmpty => nonEmpty.mark === '');
        if(noEmptyCells.length === 0 && gameInProgress) {
            gameOver();
            setPlayerUpPhrase(`It's a Draw!`);
        } 
    };

    return (
        <>  
            <PlayerPhrase currentPlayer = { currentPlayer } phrase={ playerUpPhrase } gameInProgress={ gameInProgress }/> 
            <div className={ 'grid-container' }>
                {gameBoard.map(cell => (
                    <Cell key={cell.index} cell={cell} makeAMark={ makeAMark } checkForWin={ checkForWin }/>
                ))}
            </div>
        </>
    );
}

export default GameBoard;
