// @ts-check
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { toCamel } from '../utils';
import { useResumeData } from './hooks';
import { useWindowSize } from '@uidotdev/usehooks';
import '../styles/Global.scss';
import '../styles/WorkExp.scss';

/**
 * @typedef {import('../interfaces').ResumeData} ResumeData
 * @typedef {import('../interfaces').WorkDateRange} WorkDateRange
 * @typedef {import('../interfaces').Job} Job
 * @typedef {import('../interfaces').WorkExpEntryProps} WorkExpEntryProps
 */

/** @type {(dateRange: WorkDateRange) => string} */
function getDateRangeFormated(dateRange) {
  const begin = new Date(dateRange.beginDate);
  const end = new Date(dateRange.endDate);
  /** @type {(date: Date) => string} */
  const getTimeStamp = date => `${date.toLocaleString('en-US', { month: 'short' })} ${date.getFullYear()}`;
  const beginDate = getTimeStamp(begin);
  // prettier-ignore
  const endDate =
    isNaN(end?.getFullYear()) ? dateRange.endDate
    : end?.getFullYear() && end?.getMonth() ? getTimeStamp(end)
    : dateRange.endDate;
  return [beginDate === endDate, !endDate].some(b => b) ? beginDate : `${beginDate} - ${endDate}`;
}

/** @type {(name: string) => React.JSXElementConstructor<any> | undefined} */
const tryGetIcon = name => {
  try {
    let svgName = toCamel(name);
    svgName = svgName[0].toUpperCase() + svgName.slice(1);
    return require(`./icons/${svgName}`)?.default;
  } catch {}
};

/**
 * @type {React.FC<WorkExpEntryProps>}
 * @returns {React.ReactElement}
 */
const WorkExpEntry = ({ job }) => {
  const windowSize = useWindowSize();
  const reduceIconBy =
    !job.icon?.staticSize && windowSize.width < 1321 && windowSize.width >= 1225 && job.title.length > 22 ? 18 : 0;
  const Icon = tryGetIcon(job.sector);
  /** @type {React.CSSProperties} */
  const iconStyles = windowSize.width < 1225 ? {} : { position: 'absolute' };
  const iconSize = 70 - reduceIconBy;
  const jobTitleText = (
    <Typography variant='h5' align='center' className='subHeading'>
      {job.title.replace('->', '→')}
    </Typography>
  );
  const jobTitleSection = Icon ? (
    <div className='displayFlex timeLineItem__title'>
      <div style={iconStyles}>
        <Icon {...{ width: iconSize, height: iconSize, ...job.icon }} />
      </div>
      {jobTitleText}
    </div>
  ) : (
    jobTitleText
  );
  return (
    <React.Fragment>
      <Typography variant='h2' className='timeLineYear timeLineItem'>
        {job.workDateRanges.map(getDateRangeFormated).join(' and ')}
      </Typography>
      <Box component='div' className='timeLineItem'>
        {jobTitleSection}
        <Typography variant='body1' align='center' className='body1'>
          {job.company}
        </Typography>
        {job.points && (
          <ul>
            {job.points.map(point => (
              <li>
                <Typography key={point.text} variant='subtitle1' align='left' className='subtitle1'>
                  {point.text}
                </Typography>
              </li>
            ))}
          </ul>
        )}
        <Typography variant='subtitle2' align='center' className='subtitle2'>
          {job.sector} - {job.timeDedicated}
          {job.workLocation ? ` - ${job.workLocation}` : ''} {job.teamSize ? ` - Team size of ${job.teamSize}` : ''} -{' '}
          {job.location}
        </Typography>
      </Box>
    </React.Fragment>
  );
};

/** @type {(job: Job) => string} */
const getWorkExpEntryKey = job => {
  return `${job.company}-${job.workDateRanges.map(dr => dr.beginDate || dr.endDate).join(':')}`;
};

/**
 * @returns {React.ReactElement}
 */
const WorkExp = () => {
  /** @type ResumeData */
  const resumeData = useResumeData();

  return (
    <Box component='header' className='mainContainer'>
      <Typography variant='h4' align='center' className='heading'>
        Work Experience
      </Typography>

      <Box component='div' className='timeLine'>
        {resumeData &&
          resumeData.workExperience.jobs.map(job => <WorkExpEntry key={getWorkExpEntryKey(job)} job={job} />)}
      </Box>
    </Box>
  );
};

export default WorkExp;
