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

export default function SignInSide(props) {
  //* Dark Mode toggle
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  //* Animation states
  const [showSignInCard, setShowSignInCard] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleSignInCardEntered = () => {
    setTimeout(() => {
      setShowContent(true); // Start sliding content after SignInCard appears
    }, 500); // Adjust the delay as needed
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
          direction={{ xs: 'column-reverse', md: 'row' }}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: 'auto',
          }}
        >
          {/* Content Slide */}
          <Slide
            direction="left"
            in={showContent}
            mountOnEnter
            unmountOnExit
            timeout={500}
          >
            <div>
              <Content />
            </div>
          </Slide>

          {/* SignInCard Slide */}
          <Slide
            direction="right"
            in={showSignInCard}
            mountOnEnter
            unmountOnExit
            timeout={500}
            onEntered={handleSignInCardEntered} // Trigger content slide
          >
            <div>
              <SignInCard />
            </div>
          </Slide>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
