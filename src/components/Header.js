// @ts-check
import React from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TypeAnimation } from 'react-type-animation';
// @ts-ignore
import avatar from '../avatar.jpg';
import { useResumeData } from './hooks';
import { padTypeAnimationTimings } from '../utils';
import '../styles/Header.scss';
import ShaderExample from './ShaderExample';

/**
 * @typedef {import('../interfaces').ResumeData} ResumeData
 */

/**
 * @returns {React.ReactElement}
 */
const Header = () => {
  /** @type ResumeData */
  const resumeData = useResumeData();

  return resumeData ? (
    <Box className='headerBackground'>
      <ShaderExample />
      <div className='typedContainer'>
        <Grid container justifyContent='center'>
          <Avatar
            className='headerAvatar'
            src={avatar}
            alt={`${resumeData.header.preferredName} ${resumeData.header.lastName}`}
          />
        </Grid>
        <Typography className='headerTitle' variant='h4'>
          <TypeAnimation
            className='headerTitleText'
            sequence={padTypeAnimationTimings([`${resumeData.header.preferredName} ${resumeData.header.lastName}`])}
            speed={40}
          />
        </Typography>

        <Typography className='headerSubtitle' variant='h5'>
          <TypeAnimation
            className='headerTitleText'
            sequence={padTypeAnimationTimings(resumeData.summary.roles)}
            speed={40}
            repeat={Infinity}
          />
        </Typography>
      </div>
    </Box>
  ) : (
    <></>
  );
};

export default Header;
