import React, { useState } from 'react';

const PlayerInput = (props) => {

    const [ boardSize, setBoardSize ] = useState(3);

    const handleClick = () => {
        props.initializeBoard( boardSize ); 
        setBoardSize(""); 
    }

    const handleChange = (event) => {
        setBoardSize( event.target.value );
    }

    return (
        <div className={ props.gameBuild ? 'hidden' : '' }>
        <input type={ 'number' } min={3} max={25} value={ boardSize } onChange={ handleChange } required ></input>
        <button onClick={ handleClick }>PLAY!</button> 
        </div>
    )
}

export default PlayerInput;