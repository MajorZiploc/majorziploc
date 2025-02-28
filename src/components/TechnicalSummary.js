// @ts-check
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import OurCard from './OurCard';

import FrontendIcon from './icons/Frontend';
import DesignIcon from './icons/Design';
import BackendIcon from './icons/Backend';
import TestingIcon from './icons/Testing';
import HeadlessIcon from './icons/Headless';
import ProgrammingLanguages from './icons/ProgrammingLanguages';
import DevOpsIcon from './icons/Devops';
import ToolingIcon from './icons/Tooling';
import LaptopIcon from './icons/Laptop';
// @ts-ignore
import devIconDarkTransparent from '../images/developer_icon_dark_transparent.jpeg';
import { defaultSvgStyles } from '../utils';
import { useResumeData } from './hooks';
import '../styles/Global.scss';

/**
 * @typedef {import('../interfaces').ResumeData} ResumeData
 * @typedef {import('../interfaces').TechnicalSkillsItem} TechnicalSkillsItem
 * @typedef {import('../interfaces').CardImage} CardImage
 */

/** @type {(item: TechnicalSkillsItem) => CardImage} */
const getImage = item =>
  // prettier-ignore
  item.title.match(/(Frontend)/i) ? (props) => <FrontendIcon {...{...props, viewBox: '-20 -20 530 530', fill: defaultSvgStyles.fill}} />
  : item.title.match(/(Design)/i) ? (props) => <DesignIcon {...{...props, viewBox: '-2 -2 63 63', fill: defaultSvgStyles.fill}} />
  : item.title.match(/(Backend)/i) ? (props) => <BackendIcon {...{...props, fill: defaultSvgStyles.fill}} />
  : item.title.match(/(Testing)/i) ? (props) => <TestingIcon {...{...props, fill: defaultSvgStyles.fill}} />
  : item.title.match(/(Headless)/i) ? (props) => <HeadlessIcon {...{...props, viewBox: '10 -5 276 276', fill: defaultSvgStyles.fill}} />
  : item.title.match(/(DevOps)/i) ? (props) => <DevOpsIcon {...{...props, fill: defaultSvgStyles.fill}} />
  : item.title.match(/(Languages)/i) ? (props) => <ProgrammingLanguages {...{...props, viewBox: '310 160 70 70', stroke: defaultSvgStyles.stroke}} />
  : item.title.match(/(Operating Systems)/i) ? (props) => <LaptopIcon {...{...props, stroke: defaultSvgStyles.stroke}} />
  : item.title.match(/(Tooling)/i) ? (props) => <ToolingIcon {...{...props, fill: defaultSvgStyles.fill}} />
  : devIconDarkTransparent;

/** @type {(item: TechnicalSkillsItem) => string} */
const getTitle = item => item.title;

/**
 * @returns {React.ReactElement}
 */
const TechnicalSummary = () => {
  /** @type ResumeData */
  const resumeData = useResumeData();

  return resumeData ? (
    <Box component='div' className='mainContainer'>
      <Typography variant='h4' align='center' className='heading'>
        Technical Summary
      </Typography>
      <Grid container justifyContent='center'>
        {resumeData.technicalSkills.items.map(item => (
          <Grid item xs={12} sm={8} md={4} key={item.title}>
            <OurCard
              {...{
                getImage,
                getTitle,
                item,
                cardContentBodies: [item.tools.map(t => t.name).join(', ')].filter(i => i),
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

export default TechnicalSummary;
