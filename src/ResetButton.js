import React from 'react';

const ResetButton = ({resetGame, gameInProgress}) => {
    
    function handleClick() {
        resetGame();
    }
    
    return (
        <button className={ gameInProgress ? 'hidden' : '' } onClick={ handleClick }>
            RESET
        </button>
    );
}

export default ResetButton;