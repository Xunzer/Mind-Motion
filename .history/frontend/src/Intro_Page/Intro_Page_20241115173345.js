import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const MotionAndMind = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        p: 4,
        background: 'linear-gradient(to bottom, #e3f2fd, #f7f9fc)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
      }}
    >
      {/* Header Section */}
      <Typography
        variant="h2"
        fontWeight="bold"
        gutterBottom
        sx={{
          color: '#1976d2',
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        Motion & Mind
      </Typography>
      <Typography
        variant="h5"
        sx={{
          color: 'text.secondary',
          mb: 4,
          maxWidth: 700,
          mx: 'auto',
          fontStyle: 'italic',
        }}
      >
        Empowering stroke recovery through technology.
      </Typography>

      {/* Key Features Section */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 4,
          width: '100%',
          maxWidth: 1200,
        }}
      >
        {[
          {
            title: 'Personalized Recovery',
            description:
              'Tailored exercises to help you regain motor skills and build confidence, one step at a time.',
          },
          {
            title: 'Real-Time Motion Tracking',
            description:
              'Precise tracking of hand and body movements ensures effective recovery sessions.',
          },
          {
            title: 'Progress Analytics',
            description:
              'Detailed insights into your recovery journey to help you stay motivated and on track.',
          },
          {
            title: 'Gamified Engagement',
            description:
              'Make recovery fun and engaging with interactive challenges and rewards.',
          },
        ].map((feature, index) => (
          <Box
            key={index}
            sx={{
              p: 3,
              backgroundColor: '#fff',
              borderRadius: 2,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{ color: '#000' }}
            >
              {feature.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                maxWidth: 500,
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              {feature.description}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ mt: 6 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{
            color: '#000',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.1)',
          }}
        >
          Ready to start your recovery journey?
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: '#1976d2',
            color: '#fff',
            mt: 2,
            px: 4,
            py: 1.5,
            fontSize: '1.2rem',
            borderRadius: '8px',
            textTransform: 'none',
            boxShadow: '0px 4px 10px rgba(25, 118, 210, 0.4)',
            transition: 'background 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              backgroundColor: '#1565c0',
              boxShadow: '0px 6px 15px rgba(25, 118, 210, 0.6)',
            },
          }}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default MotionAndMind;
