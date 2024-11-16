import React from 'react';
import { Box, Card, CardContent, TextField, Button, Typography } from '@mui/material';

export default function SignInCard() {
  return (
    <Card
      sx={{
        maxWidth: 400,
        mx: 'auto',
        boxShadow: 3,
        p: 2,
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Sign In
        </Typography>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
          noValidate
          autoComplete="off"
        >
          {/* Replace with Material UI TextFields */}
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            type="email"
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            required
            type="password"
          />
          {/* Replace with Material UI Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
          <Button
            variant="text"
            color="secondary"
            fullWidth
            sx={{ mt: 1 }}
          >
            Forgot Password?
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
