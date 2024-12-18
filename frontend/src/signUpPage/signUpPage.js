import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import SignInCard from './SignInCard';
import SignUpCard from './SignUpCard';
import Content from './Content';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useLocation } from 'react-router-dom';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';

export default function SignUpPage() {
  const location = useLocation();

  //* Default setup
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      mode:  darkMode ? "light" : 'dark'
    },
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  //* Animation
  const [signInDirection, setSignInDirection] = useState("right")
  const [contentDirection, setContentDirection] = useState("left")
  const [signUpDirection, setSignUpDirection] = useState("right")


  const [signInAnimation, setSignInAnimation] = useState(false)
  const [contentAnimation, setContentAnimation] = useState(false)
  const [signUpAnimation, setSignUpAnimation] = useState(true)


  const [time, setTime] = useState(950)



  const signInToSignUpTransition = () => {
    setTime(400)
    setSignInDirection("right")
    setContentAnimation("left")
    setSignInAnimation(false)
    setContentAnimation(false)

    setTimeout(() => {
      setTime(950)
      setSignUpAnimation(true)
      
    }, time); 
    

  };

  const signUpToSignInTransition = () => {
    setTime(400)
    setSignUpAnimation("left")
    setSignUpAnimation(false)

    setTimeout(() => {
      setTime(950)
      setSignInDirection("right")
      setContentAnimation("left")
      setSignInAnimation(true)
      setContentAnimation(true)
      
    }, time); 
    

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
                direction={signInDirection}
                in={signInAnimation}
                timeout={time}
                mountOnEnter
                unmountOnExit
              >
                <div>
                  <SignInCard signInToSignUpTransition = {signInToSignUpTransition}/>
                </div>
              </Slide>

              <Slide
                direction={signUpDirection}
                in={signUpAnimation}
                timeout={time}
                mountOnEnter
                unmountOnExit
              >
                <div>
                  <SignUpCard signUpToSignInTransition={signUpToSignInTransition}/>
                </div>
              </Slide>

              <Slide
                direction={contentDirection}
                in={contentAnimation}
                timeout={time}
                mountOnEnter
                unmountOnExit
              >
                <div>
                  <Content />
                </div>
              </Slide>
            </Stack>
          
        </Stack>

      </Stack>
    </ThemeProvider>
  );
}
