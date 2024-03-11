// @ts-check
import React from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Home from '@mui/icons-material/Home';
import Apps from '@mui/icons-material/Apps';
import Brush from '@mui/icons-material/Brush';
import Build from '@mui/icons-material/Build';
import { Tooltip } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import ContactMail from '@material-ui/icons/ContactMail';
// @ts-ignore
import selfPortrait from '../assets/pixel_art_self_portrait.png';
import { useResumeData } from './hooks';

import Footer from '../components/Footer';
import '../styles/Global.scss';
import '../styles/Navbar.scss';

/**
 * @typedef {import('../interfaces').ResumeData} ResumeData
 * @typedef {import('../interfaces').MenuItem} MenuItem
 */

/** @type {string} */
const homeListPath = '/';

/** @type {MenuItem[]} */
const menuItems = [
  { listIcon: <Home />, listText: 'Home', listPath: homeListPath },
  { listIcon: <AssignmentIndIcon />, listText: 'Work Experience', listPath: '/workexp' },
  { listIcon: <Build />, listText: 'Technical Summary', listPath: '/techsummary' },
  { listIcon: <Apps />, listText: 'Open Source Projects', listPath: '/opensource' },
  { listIcon: <Brush />, listText: 'About Me', listPath: '/aboutme' },
];

/** @type {() => string} */
const setInitActiveTab = () => {
  return (
    [...menuItems].reverse().find(menuItem => window.location.href.includes(menuItem.listPath))?.listPath ||
    homeListPath
  );
};

/**
 * @returns {React.ReactElement}
 */
const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(setInitActiveTab());
  /** @type ResumeData */
  const resumeData = useResumeData();

  const handleClickListItem = item => () => {
    setOpen(false);
    setActiveTab(item.listPath);
  };

  const sideList = resumeData => (
    <Box className='menuSliderContainer' component='div'>
      <Avatar className='navBarAvatar' src={selfPortrait} alt='Manyu Lakhotia' />
      <Typography className='navName'>
        {resumeData.header.preferredName} {resumeData.header.lastName}
      </Typography>
      <Divider />
      <List>
        {menuItems.map(item => (
          <ListItem
            key={item.listPath}
            className={`listItem ${item.listPath === activeTab ? 'listItemActive' : ''}`}
            onClick={handleClickListItem(item)}
            component={Link}
            to={item.listPath}
          >
            <ListItemIcon className='listItem'>{item.listIcon}</ListItemIcon>
            <ListItemText primary={item.listText} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <br />
      <a href={resumeData.header.portfolioRepo} target='_blank' rel='noreferrer' className='generalLink'>
        THIS WEBSITES CODE!
      </a>
    </Box>
  );

  return (
    <React.Fragment>
      <Box component='nav'>
        <AppBar position='static' className='appbar'>
          <Toolbar>
            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon className='hamburger' />
            </IconButton>
            <Link onClick={() => setActiveTab(homeListPath)} className='portfolioTitle' to={homeListPath}>
              <Typography variant='h5' className='navTitle'>
                Portfolio
              </Typography>
            </Link>
            <DownloadMenu />
          </Toolbar>
        </AppBar>
      </Box>
      {resumeData && (
        <Drawer open={open} anchor='left' onClose={() => setOpen(false)}>
          {sideList(resumeData)}
          <Footer />
        </Drawer>
      )}
    </React.Fragment>
  );
};

/**
 * @returns {React.ReactElement}
 */
function DownloadMenu() {
  /** @type {import('../interfaces').useState<null | HTMLElement>} */
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  /** @type {import('../interfaces').useState<boolean>} */
  const [showTooltip, setShowTooltip] = React.useState(true);
  /** @type {(event: React.MouseEvent<HTMLButtonElement>) => void} */
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    setShowTooltip(b => !b);
  };
  /** @type {() => void} */
  const handleClose = () => {
    setAnchorEl(null);
    setShowTooltip(true);
  };

  return (
    <Tooltip title={showTooltip ? 'Download' : ''}>
      <div className='marginLeftAuto'>
        <Button
          id='download-button'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          className='resumeDownload'
        >
          <DownloadIcon />
        </Button>
        <Menu
          className='downloadMenu'
          id='download-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem>
            <Link
              to='/manyu_lakhotia_resume.pdf'
              target='_blank'
              rel='noreferrer'
              className='generalLink dropdownLink'
              onClick={handleClose}
              download
            >
              Resume (PDF)
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              to='/manyu_lakhotia_resume.json'
              target='_blank'
              rel='noreferrer'
              className='generalLink dropdownLink'
              onClick={handleClose}
              download
            >
              Resume (JSON)
            </Link>
          </MenuItem>
        </Menu>
      </div>
    </Tooltip>
  );
}

export default Navbar;
