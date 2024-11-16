import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { FitnessCenter, Timeline, EmojiEvents, TrackChanges } from '@mui/icons-material';

const MotionAndMind = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        textAlign: 'center',
        p: 4,
        background: 'linear-gradient(to bottom, #0a1e3a, #152a45)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        color: '#fff',
      }}
    >
      {/* Top-Right Buttons */}
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          display: 'flex',
          gap: 2,
        }}
      >
        <Button
          variant="outlined"
          sx={{
            color: '#64b5f6',
            borderColor: '#64b5f6',
            textTransform: 'none',
            '&:hover': {
              borderColor: '#42a5f5',
              backgroundColor: 'rgba(100, 181, 246, 0.1)',
            },
          }}
        >
          Sign In
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#64b5f6',
            color: '#000',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#42a5f5',
            },
          }}
        >
          Sign Up
        </Button>
      </Box>

      {/* Header Section */}
      <Typography
        variant="h2"
        fontWeight="bold"
        gutterBottom
        sx={{
          color: '#64b5f6',
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.6)',
        }}
      >
        Motion & Mind
      </Typography>
      <Typography
        variant="h5"
        sx={{
          color: '#b0bec5',
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
            icon: <FitnessCenter sx={{ fontSize: 50, color: '#64b5f6', mb: 2 }} />,
          },
          {
            title: 'Real-Time Motion Tracking',
            description:
              'Precise tracking of hand and body movements ensures effective recovery sessions.',
            icon: <TrackChanges sx={{ fontSize: 50, color: '#64b5f6', mb: 2 }} />,
          },
          {
            title: 'Progress Analytics',
            description:
              'Detailed insights into your recovery journey to help you stay motivated and on track.',
            icon: <Timeline sx={{ fontSize: 50, color: '#64b5f6', mb: 2 }} />,
          },
          {
            title: 'Gamified Engagement',
            description:
              'Make recovery fun and engaging with interactive challenges and rewards.',
            icon: <EmojiEvents sx={{ fontSize: 50, color: '#64b5f6', mb: 2 }} />,
          },
        ].map((feature, index) => (
          <Box
            key={index}
            sx={{
              p: 3,
              backgroundColor: '#1c3348',
              borderRadius: 2,
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.8)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 6px 15px rgba(0, 0, 0, 1)',
              },
            }}
          >
            <Box>{feature.icon}</Box>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{ color: '#fff' }}
            >
              {feature.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#b0bec5',
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
            color: '#fff',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.6)',
          }}
        >
          Ready to start your recovery journey?
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: '#64b5f6',
            color: '#000',
            mt: 2,
            px: 4,
            py: 1.5,
            fontSize: '1.2rem',
            borderRadius: '8px',
            textTransform: 'none',
            boxShadow: '0px 4px 10px rgba(100, 181, 246, 0.6)',
            transition: 'background 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              backgroundColor: '#42a5f5',
              boxShadow: '0px 6px 15px rgba(100, 181, 246, 0.9)',
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
