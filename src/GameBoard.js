import React, { useState } from 'react';
import Cell from './Cell';

const GameBoard = ({ boardSize }) => {
    const [ gameBoard, setGameBoard ] = useState(createBoard(boardSize));
    const [ currentPlayer, setCurrentPlayer ] = useState('X'); 
    
    function createBoard(boardSize) {
        const gameBoardData = [];
        for(let i = 0; i < boardSize; i++) {
            for(let j = 0; j < boardSize; j++) {
                let cellLocation = {
                    index: `${(boardSize * i) + j}`,
                    'column':`${i}`,
                    'row':`${j}`,
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
        console.log(index);
        let updatedGameBoard = gameBoard.map( cell => { 
            return index.toString() === cell.index ? { ...cell, mark: currentPlayer } : cell; 
        }); 
        togglePlayer();
        setGameBoard(updatedGameBoard);
}   

    function togglePlayer() {
        if (currentPlayer === 'X') {
            setCurrentPlayer('O');
        } else {setCurrentPlayer('X')};
    }
    return (
        <div className={ 'grid-container' }>
            {gameBoard.map(cell => (
                <Cell key={cell.index} cell={cell} makeAMark={ makeAMark }/>
            ))}
        </div>
    )
}

export default GameBoard
