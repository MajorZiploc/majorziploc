// @ts-check
import React from 'react';
import DataContext from '../context/DataContext';

/**
 * @typedef {import('../interfaces').ResumeData} ResumeData
 */

export const useResumeData = () => {
  /** @type {import('../interfaces').useState<ResumeData | undefined>} */
  const [resumeData, setResumeData] = React.useState();
  const data = React.useContext(DataContext);
  React.useEffect(() => {
    (async () => {
      setResumeData(await data.resumeData);
    })();
  }, [data.resumeData]);
  return resumeData;
};
