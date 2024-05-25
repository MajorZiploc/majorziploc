// @ts-check
import React from 'react';
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
  return (
    <Box className='game-container'>
      <Box className='game-iframe-container'>
        <iframe className='game-iframe' src='https://itch.io/embed-upload/10510967?color=333333' allowFullScreen>
          <a href='https://majorziploc.itch.io/sticker-book-time-attack'>Play Sticker Book: Time Attack on itch.io</a>
        </iframe>
      </Box>
    </Box>
  );
};

export default PlayGame;
