import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import SignInCard from './SignInCard';
import SignUpCard from './SignUpCard';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';

export default function SignInSide() {
  //* Default setup
  const [darkMode, setDarkMode] = useState(false);
  const [showSignIn, setShowSignIn] = useState(true);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handlePageSwitch = () => {
    setShowSignIn((prev) => !prev);
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
            height: '100vh',
            minHeight: '100%',
            position: 'relative',
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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Slide
            direction={showSignIn ? 'left' : 'right'}
            in={showSignIn}
            timeout={600}
            mountOnEnter
            unmountOnExit
          >
            <div>
              <SignInCard />
            </div>
          </Slide>
          <Slide
            direction={showSignIn ? 'right' : 'left'}
            in={!showSignIn}
            timeout={600}
            mountOnEnter
            unmountOnExit
          >
            <div>
              <SignUpCard />
            </div>
          </Slide>
        </Box>
        <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
          <IconButton
            variant="contained"
            color="primary"
            onClick={handlePageSwitch}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            {showSignIn ? 'Switch to Sign Up' : 'Switch to Sign In'}
          </IconButton>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
