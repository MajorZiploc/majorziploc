// @ts-check
import React from 'react';

/** @typedef {import('../interfaces').ResumeDataWrapper} ResumeDataWrapper */

/** @type {React.Context<ResumeDataWrapper>} */
const DataContext = React.createContext(null);
/** @type {React.Provider<ResumeDataWrapper>} */
export const DataProvider = DataContext.Provider;
export default DataContext;
