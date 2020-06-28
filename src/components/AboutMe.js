// @ts-check
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import OurCard from './OurCard';

// @ts-ignore
import devIconDarkTransparent from '../images/developer_icon_dark_transparent.jpeg';

import SketchingIcon from './icons/Sketching';
import LaptopIcon from './icons/Laptop';
import RunningIcon from './icons/Running';
import DumbbellIcon from './icons/Dumbbell';
import GuitarIcon from './icons/Guitar';
import NutritionIcon from './icons/Nutrition';
import SlackliningIcon from './icons/Slacklining';
import SkateboardingIcon from './icons/Skateboarding';
import { defaultSvgStyles } from '../utils';
import { useResumeData } from './hooks';
import '../styles/Global.scss';

/**
 * @typedef {import('../interfaces').ResumeData} ResumeData
 * @typedef {import('../interfaces').HobbiesItem} HobbiesItem
 * @typedef {import('../interfaces').CardImage} CardImage
 */

/** @type {(hobby: HobbiesItem) => CardImage} */
const getImage = hobby =>
  // prettier-ignore
  hobby.title.match(/(sketch)/i) ? (props) => <SketchingIcon {...{...props, viewBox: '3 2 20 20', fill: defaultSvgStyles.fill}} />
  : hobby.title.match(/(programming)/i) ? (props) => <LaptopIcon {...{...props, stroke: defaultSvgStyles.stroke}} />
  : hobby.title.match(/(running)/i) ? (props) => <RunningIcon {...{...props, fill: defaultSvgStyles.fill}} />
  : hobby.title.match(/(working out)/i) ? (props) => <DumbbellIcon {...{...props, viewBox: '2 2 20 20', fill: defaultSvgStyles.fill}} />
  : hobby.title.match(/(guitar)/i) ? (props) => <GuitarIcon {...{...props, viewBox: '-10 -10 530 530', stroke: defaultSvgStyles.stroke, fill: defaultSvgStyles.fill}} />
  : hobby.title.match(/(nutrition)/i) ? (props) => <NutritionIcon {...{...props, viewBox: '0 -5 256 256', fill: defaultSvgStyles.fill, }} />
  : hobby.title.match(/(slack)/i) ? (props) => <SlackliningIcon {...{...props, viewBox: '2 1 55 55', fill: defaultSvgStyles.fill, }} />
  : hobby.title.match(/(skate)/i) ? (props) => <SkateboardingIcon {...{...props, stroke: defaultSvgStyles.stroke}} />
  : devIconDarkTransparent;

/**
 * @returns {React.ReactElement}
 */
const AboutMe = () => {
  /** @type ResumeData */
  const resumeData = useResumeData();

  /** @type {(hobby: HobbiesItem) => any} */
  const getTitle = hobby => hobby.title;
  /** @type {(hobby: HobbiesItem) => string | undefined} */
  const getLinkText = hobby => hobby.links?.main?.label;

  return resumeData ? (
    <Box component='div' className='mainContainer'>
      <Typography variant='h4' align='center' className='heading'>
        {resumeData.aboutMe.hobbies.sectionHeader}
      </Typography>
      <Grid container justifyContent='center'>
        {resumeData.aboutMe.hobbies.items.map(hobby => (
          <Grid item xs={12} sm={8} md={4} key={hobby.title}>
            <OurCard
              {...{
                getImage,
                getTitle,
                item: hobby,
                mainLinkButtonText: getLinkText(hobby),
                cardContentBodies: [hobby.description].filter(i => i),
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  ) : (
    <></>
  );
};

export default AboutMe;
