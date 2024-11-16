import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { FitnessCenter, Timeline, EmojiEvents, TrackChanges } from '@mui/icons-material';

const MotionAndMind = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        background: 'linear-gradient(to bottom, #0a1e3a, #152a45)',
        minHeight: '100vh',
        color: '#ffffff',
        padding: '20px',
        overflow: 'hidden',
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
      <Box
        sx={{
          textAlign: 'center',
          mt: 8,
          mb: 5,
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            color: '#64b5f6',
            textShadow: '2px 2px 10px rgba(0, 0, 0, 0.6)',
          }}
        >
          Motion & Mind
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: '#b0bec5',
            maxWidth: 700,
            mx: 'auto',
            fontStyle: 'italic',
          }}
        >
          Empowering stroke recovery through technology.
        </Typography>
      </Box>

      {/* Key Features Section */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 4,
          px: 2,
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {[
          {
            title: 'Personalized Recovery',
            description:
              'Tailored exercises to help you regain motor skills and build confidence, one step at a time.',
            icon: <FitnessCenter sx={{ fontSize: 50, color: '#64b5f6' }} />,
          },
          {
            title: 'Real-Time Motion Tracking',
            description:
              'Precise tracking of hand and body movements ensures effective recovery sessions.',
            icon: <TrackChanges sx={{ fontSize: 50, color: '#64b5f6' }} />,
          },
          {
            title: 'Progress Analytics',
            description:
              'Detailed insights into your recovery journey to help you stay motivated and on track.',
            icon: <Timeline sx={{ fontSize: 50, color: '#64b5f6' }} />,
          },
          {
            title: 'Gamified Engagement',
            description:
              'Make recovery fun and engaging with interactive challenges and rewards.',
            icon: <EmojiEvents sx={{ fontSize: 50, color: '#64b5f6' }} />,
          },
        ].map((feature, index) => (
          <Box
            key={index}
            sx={{
              p: 3,
              backgroundColor: '#1c3348',
              borderRadius: '12px',
              boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.6)',
              textAlign: 'center',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0px 12px 25px rgba(0, 0, 0, 1)',
              },
            }}
          >
            <Box sx={{ mb: 2 }}>{feature.icon}</Box>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ color: '#ffffff', mb: 1 }}
            >
              {feature.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#b0bec5',
                maxWidth: 500,
                mx: 'auto',
              }}
            >
              {feature.description}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          mt: 8,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            color: '#ffffff',
            textShadow: '1px 1px 10px rgba(0, 0, 0, 0.6)',
          }}
        >
          Ready to start your recovery journey?
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            mt: 3,
            backgroundColor: '#64b5f6',
            color: '#000',
            px: 4,
            py: 1.5,
            fontSize: '1.2rem',
            borderRadius: '8px',
            textTransform: 'none',
            boxShadow: '0px 6px 15px rgba(100, 181, 246, 0.6)',
            '&:hover': {
              backgroundColor: '#42a5f5',
              boxShadow: '0px 10px 20px rgba(100, 181, 246, 1)',
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
