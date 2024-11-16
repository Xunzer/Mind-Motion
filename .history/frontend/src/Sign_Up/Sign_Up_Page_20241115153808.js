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
import FormControlLabel from '@mui/material/FormControlLabel';



export default function SignInSide(props) {
  //* default set up
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  //* animation
  const fade_effect = createTheme({
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        standard: 300,
      },
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  });

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
          <Stack
            direction={{ xs: 'column-reverse', md: 'row' }}
            sx={{
              justifyContent: 'center',
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: 'auto',
            }}
          >
            <Content />
            <ThemeProvider theme={fade_effect}>
            <Fade >
              <SignInCard />
            </Fade>
          </ThemeProvider>
            
          </Stack>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
