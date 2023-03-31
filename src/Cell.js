import React from 'react';

const Cell = ({makeAMark, cell, checkForWin}) => {
    function handleClick(event) {
        makeAMark(event.target.id);
        // Random color generator for header 
        document.documentElement.style.setProperty('--color',"rgb(" + Math.floor(Math.random() * 255)
        + "," + Math.floor(Math.random() * 255) + ","
        + Math.floor(Math.random() * 255) + ")");
    }

    return (
        <div className={`cell ${cell.mark}`} id={cell.index} onClick={ handleClick }>{cell.mark}</div>
    );
}

export default Cell; 
