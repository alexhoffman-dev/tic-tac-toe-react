import React from 'react';

const Cell = ({makeAMark, cell}) => {

    function handleClick(event) {
        makeAMark(event.target.id);
        document.documentElement.style.setProperty('--color','purple');
    }
   
    //const cellSize = 

    return (
        <div className={`cell ${cell.mark}`} id={cell.index} onClick={ handleClick }>{cell.mark}</div>
    )
}

export default Cell; 