// @ts-check
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './components';
import WorkExp from './components/WorkExp';
import Navbar from './components/Navbar';
import OpenSourceProjects from './components/OpenSourceProjects';
import AboutMe from './components/AboutMe';
import TechnicalSummary from './components/TechnicalSummary';
import PlayGame from './components/PlayGame';
import { ErrorBoundary } from 'react-error-boundary';
import { DataProvider } from './context/DataContext';
import { data } from './data';
import './App.scss';
import { StyledEngineProvider } from '@mui/material/styles';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();

const cache = createCache({
  key: 'css',
  prepend: true,
});

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role='alert' className='errorContent'>
      <p className='errorHeading'>Something went wrong:</p>
      <p className='errorSubHeading'>{error.message}</p>
      <button onClick={resetErrorBoundary} className='errorButton'>
        Try again
      </button>
    </div>
  );
}

/**
 * @returns {React.ReactElement}
 */
function App() {
  return (
    <React.Fragment>
      <StyledEngineProvider injectFirst>
        <CacheProvider value={cache}>
          <ThemeProvider theme={theme}>
            <ErrorBoundary
              FallbackComponent={ErrorFallback}
              onReset={() => {
                // reset the state of your app so the error doesn't happen again
              }}
            >
              <CssBaseline />
              {/* @ts-ignore */}
              <DataProvider value={data}>
                <Navbar />
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/workexp' element={<WorkExp />} />
                  <Route path='/opensource' element={<OpenSourceProjects />} />
                  <Route path='/aboutme' element={<AboutMe />} />
                  <Route path='/techsummary' element={<TechnicalSummary />} />
                  <Route path='/playgame' element={<PlayGame />} />
                  {/*<Route path='/contact' element={<Contact />} />*/}
                </Routes>
              </DataProvider>
            </ErrorBoundary>
          </ThemeProvider>
        </CacheProvider>
      </StyledEngineProvider>
    </React.Fragment>
  );
}

export default App;
