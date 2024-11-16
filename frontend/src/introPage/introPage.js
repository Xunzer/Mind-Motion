import React from 'react';
import './css/introPage.css';
import logo from '../assets/image.png'; // Update to match the actual file name
import { Box, Typography, Button } from '@mui/material';
import { FitnessCenter, Timeline, EmojiEvents, TrackChanges } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

const IntroPage = () => {
  const navigate = useNavigate();
  const navigateToSignUp = () => {
    navigate("/signup", { state: { parent_button: false } });
  };

  const navigateToSignIn = () => {
    navigate("/signin", { state: { parent_button: true } });
  };

  return (
    <div className="motion-and-mind">
      <div className="background-blur-top"></div>
      <div className="background-blur-bottom"></div>

      <div className="top-right-buttons">
        <Button
          variant="outlined"
          sx={{ color: '#64b5f6', borderColor: '#64b5f6' }}
          onClick={() => navigateToSignIn()}
        >
          Sign In
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#64b5f6', color: '#000' }}
          onClick={() => navigateToSignUp()}
        >
          Sign Up
        </Button>
      </div>

      {/* Header Section */}
      <div className="header">
        <img src={logo} alt="Mind & Motion Logo" className="header-logo" />
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
        <Button
          className="cta-button"
          sx={{
            mt: 4, // Move down
            px: 6, // Wider button
            py: 2, // Increased height
            backgroundColor: 'transparent', // Transparent background
            color: '#64b5f6', // Match the theme color for text
            fontSize: '1.2rem', // Adjust font size
            fontWeight: 'bold',
            textTransform: 'none', // Disable uppercase transformation
            border: '2px solid #64b5f6', // Add a border for better visibility
            borderRadius: '8px', // Rounded corners
            boxShadow: 'none',
            transition: 'all 0.3s ease', // Smooth hover animation
            '&:hover': {
              backgroundColor: 'rgba(100, 181, 246, 0.1)', // Slightly filled on hover
              boxShadow: '0px 0px 20px 4px rgba(100, 181, 246, 0.8)', // Glowing effect
            },
          }}
        >
          Get Started
        </Button>

      </div>
    </div>
  );
};

export default IntroPage;
