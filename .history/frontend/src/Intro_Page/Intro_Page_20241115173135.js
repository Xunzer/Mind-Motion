import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const MotionAndMind = () => {
  return (
    <Box sx={{ textAlign: 'center', p: 4, backgroundColor: '#f7f9fc', minHeight: '100vh' }}>
      {/* Header Section */}
      <Typography 
        variant="h2" 
        fontWeight="bold" 
        gutterBottom
        sx={{ color: '#1976d2' }}
      >
        Motion & Mind
      </Typography>
      <Typography 
        variant="h5" 
        sx={{ color: 'text.secondary', mb: 4 }}
      >
        Empowering stroke recovery through technology.
      </Typography>

      {/* Key Features Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box>
          <Typography 
            variant="h4" 
            fontWeight="bold" 
            gutterBottom
            sx={{ color: '#000' }}
          >
            Personalized Recovery
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}
          >
            Tailored exercises to help you regain motor skills and build confidence, one step at a time.
          </Typography>
        </Box>

        <Box>
          <Typography 
            variant="h4" 
            fontWeight="bold" 
            gutterBottom
            sx={{ color: '#000' }}
          >
            Real-Time Motion Tracking
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}
          >
            Precise tracking of hand and body movements ensures effective recovery sessions.
          </Typography>
        </Box>

        <Box>
          <Typography 
            variant="h4" 
            fontWeight="bold" 
            gutterBottom
            sx={{ color: '#000' }}
          >
            Progress Analytics
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}
          >
            Detailed insights into your recovery journey to help you stay motivated and on track.
          </Typography>
        </Box>

        <Box>
          <Typography 
            variant="h4" 
            fontWeight="bold" 
            gutterBottom
            sx={{ color: '#000' }}
          >
            Gamified Engagement
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}
          >
            Make recovery fun and engaging with interactive challenges and rewards.
          </Typography>
        </Box>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ mt: 6 }}>
        <Typography 
          variant="h5" 
          fontWeight="bold" 
          gutterBottom
          sx={{ color: '#000' }}
        >
          Ready to start your recovery journey?
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          sx={{ backgroundColor: '#1976d2', color: '#fff', mt: 2 }}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default MotionAndMind;
