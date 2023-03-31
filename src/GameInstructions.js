import React from 'react';

const GameInstructions = ({gameBuild}) => {
    // If the  gameBuild is null then display the first set of instructions.
    // Otherwise display the how to win instructions.
    const preGameInstructions = `Instructions: Select a board size by submitting a number in the field below vvvv`;
    let instructions = gameBuild === null ? preGameInstructions : `Instructions: Welcome players, get ${gameBuild.boardSize} marks in a row (up/down , side/side, or diagonally), to win!`;

    return (
        <h3>
            { instructions }
        </h3>
    );
}

export default GameInstructions;
