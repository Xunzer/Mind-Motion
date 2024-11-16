import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import SitemarkIcon from '@mui/icons-material/AccountTree';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  maxWidth: 450,
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow:
    '0px 5px 15px rgba(0, 0, 0, 0.1), 0px 15px 35px rgba(0, 0, 0, 0.05)',
}));

export default function SignUpCard() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const validateInputs = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let isValid = true;

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Enter a valid email address');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateInputs()) {
      const formData = new FormData(event.currentTarget);
      console.log({
        email: formData.get('email'),
        password: formData.get('password'),
      });
    }
  };

  return (
    <Card variant="outlined">
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <SitemarkIcon fontSize="large" color="primary" />
      </Box>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            error={emailError}
            helperText={emailErrorMessage}
            variant="outlined"
            required
            fullWidth
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            id="password"
            name="password"
            type="password"
            placeholder="••••••"
            error={passwordError}
            helperText={passwordErrorMessage}
            variant="outlined"
            required
            fullWidth
          />
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <FormControlLabel
            control={<Checkbox name="remember" />}
            label="Remember me"
          />
          <Link href="/forgot-password" underline="hover">
            Forgot password?
          </Link>
        </Box>
        <Button type="submit" variant="contained" fullWidth>
          Sign in
        </Button>
      </Box>
      <Divider sx={{ my: 2 }}>or</Divider>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={() => alert('Sign in with Google')}
        >
          Sign in with Google
        </Button>
        <Button
          variant="outlined"
          fullWidth
          startIcon={<FacebookIcon />}
          onClick={() => alert('Sign in with Facebook')}
        >
          Sign in with Facebook
        </Button>
      </Box>
      <Typography textAlign="center" mt={2}>
        Don&apos;t have an account?{' '}
        <Link href="/sign-up" underline="hover">
          Sign up
        </Link>
      </Typography>
    </Card>
  );
}
