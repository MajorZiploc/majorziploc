// @ts-check
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import '../styles/Global.scss';
import '../styles/PlayGame.scss';
import { useResumeData } from './hooks';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import '../styles/Global.scss';

/**
 * @typedef {import('../interfaces').ResumeData} ResumeData
 */

// TODO: switch PlayGame impl to this once iframe issues are sorted out from ./README.md
/**
 * @returns {React.ReactElement}
 */
const PlayGameFull = () => {
  /** @type ResumeData */
  const resumeData = useResumeData();
  const [gameFailedToLoad, setGameFailedToLoad] = useState(false);
  const [gameWidgetFailedToLoad, setGameWidgetFailedToLoad] = useState(false);

  const handleEmbeddedGameLoaded = e => {
    const iframe = document.querySelector('.game-iframe');
    // @ts-ignore
    setGameFailedToLoad(!iframe?.contentWindow);
  };

  const handleEmbeddedGameWidgetLoaded = e => {
    const iframe = document.querySelector('.game-widget-iframe-container');
    // @ts-ignore
    setGameWidgetFailedToLoad(!iframe?.contentWindow);
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
            sandbox='allow-same-origin'
            onLoad={handleEmbeddedGameLoaded}
          >
            <a href={resumeData.playGame.embedded.href}>{resumeData.playGame.embedded.label}</a>
          </iframe>
        </Box>
      ) : !gameWidgetFailedToLoad ? (
        <iframe
          title={resumeData.playGame.widget.label}
          src={resumeData.playGame.widget.src}
          className='game-widget-iframe-container'
          allow='cross-origin-isolated'
          sandbox='allow-same-origin'
          onLoad={handleEmbeddedGameWidgetLoaded}
        >
          <a href={resumeData.playGame.widget.href}>{resumeData.playGame.widget.label}</a>
        </iframe>
      ) : (
        <PlayGameLinkCard
          link={resumeData.playGame.link.href}
          alt={resumeData.playGame.link.label}
          image={resumeData.playGame.link.src}
        />
      )}
    </Box>
  ) : (
    <></>
  );
};

/**
 * @returns {React.ReactElement}
 */
const PlayGame = () => {
  /** @type ResumeData */
  const resumeData = useResumeData();

  return resumeData ? (
    <Box className='game-container'>
      <PlayGameLinkCard
        link={resumeData.playGame.link.href}
        alt={resumeData.playGame.link.label}
        image={resumeData.playGame.link.src}
      />
    </Box>
  ) : (
    <></>
  );
};

/**
 * @returns {React.ReactElement}
 */
const PlayGameLinkCard = ({ link, image, alt }) => {
  return (
    <Card className='game-link-container'>
      <CardActionArea className='game-link-action-area' href={link} target='_blank'>
        <CardMedia component='img' alt={alt} height='300' image={image} />
      </CardActionArea>
    </Card>
  );
};

export default PlayGame;
