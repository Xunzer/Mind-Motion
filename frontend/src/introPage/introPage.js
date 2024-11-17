import React from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { FitnessCenter, Timeline, EmojiEvents, TrackChanges } from '@mui/icons-material';
import logo from '../assets/image.png'; // Update with the actual path
import "./css/Stickman.css"
const IntroPage = () => {
  const navigate = useNavigate();

  const navigateToSignUp = () => navigate("/signup", { state: { parent_button: false } });


  const featureData = [
    {
      title: 'Personalized Recovery',
      description: 'Tailored exercises to help you regain motor skills and build confidence.',
      icon: <FitnessCenter fontSize="large" color="primary" />,
    },
    {
      title: 'Real-Time Motion Tracking',
      description: 'Precise tracking of hand and body movements ensures effective recovery.',
      icon: <TrackChanges fontSize="large" color="primary" />,
    },
    {
      title: 'Progress Analytics',
      description: 'Detailed insights into your recovery journey to help you stay motivated.',
      icon: <Timeline fontSize="large" color="primary" />,
    },
    {
      title: 'Gamified Engagement',
      description: 'Make recovery fun with interactive challenges and rewards.',
      icon: <EmojiEvents fontSize="large" color="primary" />,
    },
  ];

  return (
    <Box
      sx={{
        background: 'linear-gradient(145deg, #243B55, #141E30)', // Dark calming gradient
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >


      {/* Header Section */}
      <Box textAlign="center" sx={{ marginTop: 4 }}>
        <CardMedia
          component="img"
          src={logo}
          alt="Mind & Motion Logo"
          sx={{ width: 400, margin: '0 auto', marginBottom: 2 }}
        />

        <Typography
          variant="subtitle1"
          sx={{ maxWidth: 600, margin: '0 auto', color: '#b0bec5', fontStyle: 'italic' }}
        >
          Empowering stroke recovery through cutting-edge technology.
        </Typography>
      </Box>

      {/* Features Section */}
      <Box sx={{ padding: '40px 0', width: '100%' }}>
        <Grid container spacing={4} justifyContent="center">
          {featureData.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  background: '#1c313a', // Dark card background
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  textAlign: 'center',
                  borderRadius: 2,
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)',
                    transform: 'scale(1.03)',
                  },
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <CardContent>
                  <Box mb={2}>{feature.icon}</Box>
                  <Typography variant="h6" fontWeight="bold" sx={{ color: '#ffffff' }}>
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#b0bec5', marginTop: 1, minHeight: '60px' }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          textAlign: 'center',
          padding: '40px 20px',
          background: 'linear-gradient(90deg, #102a43, #243b55)', // Subtle gradient
          color: 'white',
          width: '100%',
          borderRadius: '8px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
          marginBottom: '40px', // Adjusted margin to move it up
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            color: '#e3f2fd', // Softer white
            marginBottom: 2,
            letterSpacing: '0.5px',
          }}
        >
          Ready to start your recovery journey?
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            padding: '10px 30px',
            fontSize: '1rem',
            background: 'linear-gradient(90deg, #64b5f6, #42a5f5)', // Gradient button
            borderRadius: '30px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
            '&:hover': {
              background: 'linear-gradient(90deg, #42a5f5, #64b5f6)',
            },
          }}
          onClick={navigateToSignUp}
        >
          Get Started
        </Button>
      </Box>

    </Box>
  );
};

export default IntroPage;
