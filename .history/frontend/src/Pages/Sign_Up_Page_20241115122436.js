import React, { useState } from 'react';
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
          backgroundImage: darkMode
            ? 'radial-gradient(circle, rgba(25,25,25,1) 0%, rgba(15,15,15,1) 100%)'
            : 'radial-gradient(circle, rgba(240,240,255,1) 0%, rgba(225,225,240,1) 100%)',
          backgroundSize: 'cover',
          padding: 2,
        }}
      >
        <Stack
          sx={{
            backdropFilter: 'blur(20px)', // Frosted glass effect
            background: darkMode
              ? 'rgba(50, 50, 50, 0.8)'
              : 'rgba(255, 255, 255, 0.6)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            padding: 4,
            width: '90%',
            maxWidth: '800px',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Content />
          <SignInCard />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
