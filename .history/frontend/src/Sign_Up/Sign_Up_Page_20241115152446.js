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
  const [darkMode, setDarkMode] = useState(false);
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
    const timer = setTimeout(() => setAnimate(true), 300); // Delay to allow SignInCard to center first
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
        sx={[
          {
            justifyContent: 'center',
            height: 'calc((1 - var(--template-frame-height, 0)) * 100%)',
            marginTop: 'max(40px - var(--template-frame-height, 0px), 0px)',
            minHeight: '100%',
            position: 'relative',
            overflow: 'hidden',
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
          direction="row"
          sx={{
            justifyContent: 'center',
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: 'auto',
            position: 'relative',
          }}
        >
          {/* Animated SignInCard */}
          <SignInCard
            sx={{
              position: 'relative',
              transform: animate ? 'translateX(0)' : 'translateX(-50%)',
              opacity: animate ? 1 : 0,
              transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
            }}
          />

          {/* Animated Content */}
          <Content
            sx={{
              position: 'absolute',
              transform: animate ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 0.7s ease-out',
            }}
          />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
