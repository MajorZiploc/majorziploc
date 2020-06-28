// @ts-check
import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LinkedIn from '@mui/icons-material/LinkedIn';
import Email from '@mui/icons-material/Email';
import GitHub from '@mui/icons-material/GitHub';
import { useResumeData } from './hooks';
import '../styles/Footer.scss';

/**
 * @typedef {import('../interfaces').ResumeData} ResumeData
 */

/**
 * @returns {React.ReactElement}
 */
const Footer = () => {
  /** @type ResumeData */
  const resumeData = useResumeData();

  return resumeData ? (
    <BottomNavigation className='bottomNavContainer'>
      <BottomNavigationAction icon={<LinkedIn />} className='footerLink' href={resumeData.header.linkedIn} />
      <BottomNavigationAction icon={<Email />} className='footerLink' href={`mailto:${resumeData.header.email}`} />
      <BottomNavigationAction icon={<GitHub />} className='footerLink' href={resumeData.header.github} />
    </BottomNavigation>
  ) : (
    <></>
  );
};
export default Footer;
