import React, { useState } from 'react';

const PlayerInput = ({initializeBoard}) => {
    const [ currentBoardSize, setCurrentBoardSize ] = useState(3);

    const handleClick = () => {
        initializeBoard(currentBoardSize );
        setCurrentBoardSize("");
    }

    const handleChange = (event) => {
        setCurrentBoardSize(parseInt(event.target.value));
    }

    return (
        <div>
            <input type={'number'} min={3} max={25} value={ currentBoardSize } onChange={ handleChange } required ></input>
            <button onClick={ handleClick }>PLAY!</button> 
        </div>
    );
}

export default PlayerInput;
