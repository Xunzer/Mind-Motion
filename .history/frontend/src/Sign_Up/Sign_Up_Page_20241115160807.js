import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import SignInCard from './SignInCard';
import Content from './Content';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';

export default function SignInSide(props) {
  //* Default setup
  const [darkMode, setDarkMode] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true); // Controls visibility for animation
  const [animationDirection, setAnimationDirection] = useState('right'); // Animation direction for SignInCard
  const [contentDirection, setContentDirection] = useState('left'); // Animation direction for Content
  const [currentPage, setCurrentPage] = useState('home');
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
    setAnimationDirection('left');
    setContentDirection('right');

    // Wait for the animation to complete, then hide the current page
    setTimeout(() => {
      setIsPageVisible(false);
      // Perform navigation here (e.g., React Router, etc.)
      // After navigation, reset directions for the next page load
      setCurrentPage(currentPage === 'home' ? 'second' : 'home'); // Switch pages
      setAnimationDirection('right');
      setContentDirection('left');
      setIsPageVisible(true);
    }, 1500); // Timeout matches the Slide `timeout` duration
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
        sx={[
          {
            justifyContent: 'center',
            height: 'calc((1 - var(--template-frame-height, 0)) * 100%)',
            marginTop: 'max(40px - var(--template-frame-height, 0px), 0px)',
            minHeight: '100%',
          },
          (theme) => ({
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              zIndex: -1,
              inset: 0,
              backgroundImage:
                'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
              backgroundRepeat: 'no-repeat',
              ...(theme.palette.mode === 'dark' && {
                backgroundImage:
                  'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
              }),
            },
          }),
        ]}
      >
        <Stack
          direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{
            justifyContent: 'center',
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: 'auto',
          }}
        >
          {isPageVisible && (
            <Stack
              direction={{ xs: 'column-reverse', md: 'row' }}
              sx={{
                justifyContent: 'center',
                gap: { xs: 6, sm: 12 },
                p: { xs: 2, sm: 4 },
                m: 'auto',
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
                  <SignInCard />
                </div>
              </Slide>
              <Slide
                direction={contentDirection}
                in={isPageVisible}
                timeout={1500}
                mountOnEnter
                unmountOnExit
              >
                <div>
                  <Content />
                </div>
              </Slide>
            </Stack>
          )}
        </Stack>
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
