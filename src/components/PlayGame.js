// @ts-check
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import '../styles/Global.scss';
import '../styles/PlayGame.scss';

/**
 * @typedef {import('../interfaces').ResumeData} ResumeData
 */

/**
 * @returns {React.ReactElement}
 */
const PlayGame = () => {
  const [gameFailedToLoad, setGameFailedToLoad] = useState(false);

  const handleEmbeddedGameLoaded = e => {
    const iframe = document.querySelector('.game-iframe');
    // @ts-ignore
    setGameFailedToLoad(!iframe?.contentDocument);
  };

  return (
    <Box className='game-container'>
      {!gameFailedToLoad ? (
        <Box className='game-iframe-container'>
          <iframe
            title='Sticker Book: Time Attack'
            className='game-iframe'
            src='https://itch.io/embed-upload/10510967?color=333333'
            allowFullScreen
            allow='cross-origin-isolated'
            onLoad={handleEmbeddedGameLoaded}
          >
            <a href='https://majorziploc.itch.io/sticker-book-time-attack'>Play Sticker Book: Time Attack on itch.io</a>
          </iframe>
        </Box>
      ) : (
        <iframe src='https://itch.io/embed/2727667' className='game-link-iframe-container'>
          <a href='https://majorziploc.itch.io/sticker-book-time-attack'>Sticker Book: Time Attack by MajorZiploc</a>
        </iframe>
      )}
    </Box>
  );
};

export default PlayGame;
