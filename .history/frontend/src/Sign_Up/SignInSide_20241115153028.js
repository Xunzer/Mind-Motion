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
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';

export default function SignInSide(props) {
  const [darkMode, setDarkMode] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
          overflow: 'hidden',
        }}
      >
        <Fade
          in
          timeout={1000}
          onEntered={() => setShowContent(true)} // Trigger slide animation after Fade
        >
          <Box sx={{ position: 'absolute', zIndex: 2 }}>
            <SignInCard />
          </Box>
        </Fade>
        <Slide
          direction="up"
          in={showContent}
          timeout={{ enter: 1000, exit: 500 }}
        >
          <Box
            sx={{
              position: 'absolute',
              zIndex: 1,
              display: 'flex',
              flexDirection: { xs: 'column-reverse', md: 'row' },
              gap: { xs: 6, sm: 12 },
              justifyContent: 'center',
              p: { xs: 2, sm: 4 },
            }}
          >
            <Content />
          </Box>
        </Slide>
      </Stack>
    </ThemeProvider>
  );
}
