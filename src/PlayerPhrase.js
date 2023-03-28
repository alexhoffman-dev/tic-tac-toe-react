import React from 'react';

const PlayerPhrase = ({currentPlayer, phrase, gameInProgress}) => {
    
    return (
      <h3>{ gameInProgress ? `It's ${currentPlayer} Turn! `: phrase }</h3>
    )

}

export default PlayerPhrase; 