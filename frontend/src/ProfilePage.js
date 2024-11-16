import React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(3),
}));

export default function ProfilePage() {
  const handleUpdate = () => {
    // Handle profile update logic here
    alert('Profile Updated!');
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Profile Page
      </Typography>
      <Grid container spacing={3}>
        {/* User Info Section */}
        <Grid item xs={12} md={4}>
          <Avatar
            alt="User Name"
            src="/path/to/avatar.jpg" // Replace with dynamic source or default avatar
            sx={{ width: 128, height: 128, margin: 'auto' }}
          />
          <Typography variant="h6" align="center" style={{ marginTop: '16px' }}>
            John Doe
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary">
            johndoe@example.com
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary">
            Role: User
          </Typography>
        </Grid>

        {/* Edit Profile Section */}
        <Grid item xs={12} md={8}>
          <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom>
              Edit Profile
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  defaultValue="John"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  defaultValue="Doe"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  defaultValue="johndoe@example.com"
                  variant="outlined"
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  defaultValue="(123) 456-7890"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  defaultValue="123 Main St, City, Country"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdate}
                  fullWidth
                >
                  Update Profile
                </Button>
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
}
