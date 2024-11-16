import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import SignInCard from './SignInCard';
import Content from './Content';
import SecondPage from './SecondPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import Slide from '@mui/material/Slide';

export default function SignInSide() {
  //* Default setup
  const [darkMode, setDarkMode] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true); // Controls visibility for the first page
  const [currentPage, setCurrentPage] = useState('home'); // Tracks which page is active
  const [animationDirection, setAnimationDirection] = useState('right'); // Slide direction

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handlePageSwitch = () => {
    setAnimationDirection('left'); // Slide out to the left

    setTimeout(() => {
      setIsPageVisible(false); // Hide the current page
      setCurrentPage(currentPage === 'home' ? 'second' : 'home'); // Switch pages
      setAnimationDirection('right'); // Set slide-in direction for the new page

      setTimeout(() => {
        setIsPageVisible(true); // Show the new page
      }, 50); // Slight delay to ensure smooth transition
    }, 1500); // Matches Slide timeout
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <IconButton
        onClick={toggleDarkMode}
        sx={{ position: 'fixed', top: '1rem', right: '1rem' }}
        color="inherit"
      >
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <Stack
        direction="column"
        component="main"
        sx={{
          justifyContent: 'center',
          height: '100vh',
          minHeight: '100%',
          overflow: 'hidden', // Prevent overflow during animations
        }}
      >
        <Slide
          direction={animationDirection}
          in={isPageVisible}
          timeout={1500}
          mountOnEnter
          unmountOnExit
        >
          <div>
            {currentPage === 'home' ? (
              <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
                spacing={4}
                sx={{ height: '100%' }}
              >
                <SignInCard />
                <Content />
              </Stack>
            ) : (
              <SecondPage />
            )}
          </div>
        </Slide>

        <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
          <IconButton
            variant="contained"
            color="primary"
            onClick={handlePageSwitch}
          >
            Switch Page
          </IconButton>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
