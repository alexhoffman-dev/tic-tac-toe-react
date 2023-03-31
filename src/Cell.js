import React from 'react';

const Cell = ({makeAMark, cell, checkForWin}) => {
    function handleClick(event) {
        makeAMark(event.target.id);
        document.documentElement.style.setProperty('--color','purple');
    }

    // Never Used:
    // function handleChange() {
    //     debugger;
    //     checkForWin(); 
    // }

    return (
        <div className={`cell ${cell.mark}`} id={cell.index} onClick={ handleClick }>{cell.mark}</div>
    );
}

export default Cell; 
