import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import SignInCard from './SignInCard';
import Content from './Content';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import Slide from '@mui/material/Slide';

export default function SignInSide() {
  //* Default setup
  const [darkMode, setDarkMode] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true); // Controls visibility for animation
  const [animationDirection, setAnimationDirection] = useState('right'); // Animation direction for Slide
  const [currentPage, setCurrentPage] = useState('home'); // Tracks current page

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handlePageSwitch = () => {
    // Trigger the animations to go in the opposite direction
    setAnimationDirection('left'); // Slide out to the left

    setTimeout(() => {
      setIsPageVisible(false); // Hide current page
      setTimeout(() => {
        setCurrentPage(currentPage === 'home' ? 'second' : 'home'); // Switch page
        setAnimationDirection('right'); // Slide in from the right
        setIsPageVisible(true); // Show new page
      }, 300); // Slight delay for smooth transition
    }, 1500); // Matches Slide timeout duration
  };

  const renderPageContent = () => {
    if (currentPage === 'home') {
      return (
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
      );
    } else {
      return (
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={4}
          sx={{ height: '100%' }}
        >
          <h1>Welcome to the Second Page</h1>
          <p>This is an example of the second page content.</p>
        </Stack>
      );
    }
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
          <div>{renderPageContent()}</div>
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
