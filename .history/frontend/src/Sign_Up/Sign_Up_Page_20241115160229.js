import React from 'react';
import { Stack, Typography } from '@mui/material';

export default function SecondPage() {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ height: '100vh', bgcolor: 'secondary.main', color: 'white' }}
    >
      <Typography variant="h3">Welcome to the Second Page!</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        This is an example of a simple page switch with animations.
      </Typography>
    </Stack>
  );
}
