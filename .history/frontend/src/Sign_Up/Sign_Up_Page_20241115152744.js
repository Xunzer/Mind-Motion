import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import SignInCard from './SignInCard';
import Content from './Content';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function SignInSide(props) {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const [animate, setAnimate] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 300); // Delay to start animation
    return () => clearTimeout(timer);
  }, []);

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
          alignItems: 'center',
          height: '100vh',
          position: 'relative',
          bgcolor: theme.palette.background.default,
          overflow: 'hidden',
        }}
      >
        <Stack
          direction="row"
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            gap: 4,
          }}
        >
          {/* Animated Content */}
          <div
            style={{
              transform: animate ? 'translateX(0)' : 'translateX(-100%)',
              opacity: animate ? 1 : 0,
              transition: 'transform 0.6s ease-out, opacity 0.6s ease-out',
            }}
          >
            <Content />
          </div>

          {/* Animated SignInCard */}
          <div
            style={{
              transform: animate ? 'translateY(0)' : 'translateY(-50px)',
              opacity: animate ? 1 : 0,
              transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
            }}
          >
            <SignInCard />
          </div>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
