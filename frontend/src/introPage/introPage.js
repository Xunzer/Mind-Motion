import React from 'react';
import './css/introPage.css';
import { Box, Typography, Button } from '@mui/material';
import { FitnessCenter, Timeline, EmojiEvents, TrackChanges } from '@mui/icons-material';

const IntroPage = () => {
  return (
    <div className="motion-and-mind">
      {/* Decorative Background Blurs */}
      <div className="background-blur-top"></div>
      <div className="background-blur-bottom"></div>

      {/* Top-Right Buttons */}
      <div className="top-right-buttons">
        <Button variant="outlined" sx={{ color: '#64b5f6', borderColor: '#64b5f6' }}>
          Sign In
        </Button>
        <Button variant="contained" sx={{ backgroundColor: '#64b5f6', color: '#000' }}>
          Sign Up
        </Button>
      </div>

      {/* Header Section */}
      <div className="header">
        <Typography variant="h2" className="header-title" fontWeight="bold">
          Motion & Mind
        </Typography>
        <Typography variant="h5" className="header-subtitle">
          Empowering stroke recovery through technology.
        </Typography>
      </div>

      {/* Key Features Section */}
      <div className="features-container features-container-md">
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
          <div className="feature-card" key={index}>
            <Box sx={{ mb: 2 }}>{feature.icon}</Box>
            <Typography variant="h4" fontWeight="bold">
              {feature.title}
            </Typography>
            <Typography variant="body1" sx={{ color: '#b0bec5', maxWidth: 500, mx: 'auto' }}>
              {feature.description}
            </Typography>
          </div>
        ))}
      </div>

      {/* Call to Action Section */}
      <div className="call-to-action">
        <Typography variant="h5" className="call-to-action-title" fontWeight="bold">
          Ready to start your recovery journey?
        </Typography>
        <Button className="cta-button">Get Started</Button>
      </div>
    </div>
  );
};

export default IntroPage;
