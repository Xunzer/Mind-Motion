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
      description: `Tailored exercises to help you regain motor skills and build confidence. 
      Our program adapts to your specific recovery needs, ensuring you achieve steady and meaningful progress.`,
      icon: <FitnessCenter fontSize="large" color="primary" />,
    },
    {
      title: 'Real-Time Motion Tracking',
      description: `Precise tracking of hand and body movements ensures effective recovery. 
      Using advanced motion detection technology, our system provides immediate feedback to help you improve.`,
      icon: <TrackChanges fontSize="large" color="primary" />,
    },
    {
      title: 'Progress Analytics',
      description: `Detailed insights into your recovery journey to help you stay motivated. 
      Track milestones, visualize trends, and understand how your efforts translate into measurable progress.`,
      icon: <Timeline fontSize="large" color="primary" />,
    },
    {
      title: 'Gamified Engagement',
      description: `Make recovery fun with interactive challenges and rewards. 
      Complete daily tasks, earn badges, and compete in friendly challenges to stay motivated and engaged.`,
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
    background: 'rgba(28, 49, 58, 0.5)', 
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    borderRadius: 2,
    '&:hover': {
      boxShadow: '0 0 20px 4px rgba(100, 181, 246, 0.8)', 
      transform: 'scale(1.05)', 
      background: 'rgba(28, 49, 58, 0.015)', 
    },
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
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
            background: 'rgba(100, 181, 246, 0.5)', // Transparent background
            borderRadius: '30px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)', // Subtle shadow
            color: '#fff',
            '&:hover': {
              background: 'rgba(66, 165, 245, 0.8)', // Slightly less transparent on hover
              boxShadow: '0 0 20px 5px rgba(100, 181, 246, 0.7)', // Glowing effect
              transform: 'scale(1.05)', // Slightly enlarge
            },
            transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
            backdropFilter: 'blur(5px)', // Adds a blurred background effect
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
