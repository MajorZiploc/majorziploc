// @ts-check
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import '../styles/Global.scss';
import '../styles/PlayGame.scss';
import { useResumeData } from './hooks';

/**
 * @typedef {import('../interfaces').ResumeData} ResumeData
 */

/**
 * @returns {React.ReactElement}
 */
const PlayGame = () => {
  /** @type ResumeData */
  const resumeData = useResumeData();
  const [gameFailedToLoad, setGameFailedToLoad] = useState(false);

  const handleEmbeddedGameLoaded = e => {
    const iframe = document.querySelector('.game-iframe');
    // @ts-ignore
    setGameFailedToLoad(!iframe?.contentDocument);
  };

  return resumeData ? (
    <Box className='game-container'>
      {!gameFailedToLoad ? (
        <Box className='game-iframe-container'>
          <iframe
            title={resumeData.playGame.embedded.label}
            className='game-iframe'
            src={resumeData.playGame.embedded.src}
            allowFullScreen
            allow='cross-origin-isolated'
            onLoad={handleEmbeddedGameLoaded}
          >
            <a href={resumeData.playGame.embedded.href}>{resumeData.playGame.embedded.label}</a>
          </iframe>
        </Box>
      ) : (
        <iframe
          title={resumeData.playGame.link.label}
          src={resumeData.playGame.link.src}
          className='game-link-iframe-container'
        >
          <a href={resumeData.playGame.link.href}>{resumeData.playGame.link.label}</a>
        </iframe>
      )}
    </Box>
  ) : (
    <></>
  );
};

export default PlayGame;
