import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import mindMotionIcon from '../assets/mindMotion.png'; // Ensure the correct path to the image file
import { useTheme } from '@mui/material/styles'; // Import useTheme to access the current theme
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import logoImage from '../assets/logo.jpg';
import AppLogoDark from '../assets/app_logo_blue.png';
import { Dialog, DialogContent, DialogContentText } from '@mui/material';
import { useState, useEffect } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const NAVIGATION = [
    {
    segment: 'myAccount',
    title: 'My Account',
    icon: <AccountBoxIcon />,
    },
    {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    },
    {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  palette: {
      mode: 'dark',  // Set the mode to dark by default
  },
  breakpoints: {
      values: {
          xs: 0,
          sm: 600,
          md: 600,
          lg: 1200,
          xl: 1536,
      },
  },
}); 

function useDemoRouter(initialPath) {
    const [pathname, setPathname] = React.useState(initialPath);

    const router = React.useMemo(() => {
        return {
        pathname,
        searchParams: new URLSearchParams(),
        navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);

    return router;
}

const ProfilePage = () => (
    <PageContainer>
      <Paper elevation={3} style={{ padding: 24, animation: 'fadeIn 1s ease-out' }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <Avatar
              alt="User Name"
              src={logoImage}
              style={{ width: 128, height: 128, margin: 'auto' }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h5">Mike Jattu</Typography>
            <Typography variant="body1" color="textSecondary">
              sjattu@ualberta.ca
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Role: User
            </Typography>
            <Grid container spacing={2} alignItems="center" style={{ marginTop: 16 }}>
              <Grid item>
                <Button variant="contained" color="primary">
                  Edit Profile
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary">
                  Sign Out
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </PageContainer>
  );
  const DashboardContent = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const levels = [
      { name: 'Level 1', color: 'primary' },
      { name: 'Level 2', color: 'grey' },
      { name: 'Level 3', color: 'grey' },
      { name: 'Level 4', color: 'grey' },
      { name: 'Level 5', color: 'grey' },
      { name: 'Level 6', color: 'grey' },
    ];
  
    const waveOffsets = [0, 40, -40, 40, -40, 40];
    const greyColor = theme.palette.grey[500];
  
    // Animation keyframes
    const hopAnimation = `
      @keyframes hop {
        0%, 100% {
          transform: translate(-50%, 0);
        }
        50% {
          transform: translate(-50%, -20px);
        }
      }
    `;

    const fadeInAnimation = `
      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    `;
  
    // Inject animation styles into the document head
    React.useEffect(() => {
      const style = document.createElement('style');
      style.innerHTML = hopAnimation;
      document.head.appendChild(style);
      return () => {
        document.head.removeChild(style);
      };
    }, [hopAnimation]);
  
    // Determine tooltip colors dynamically based on theme mode
    const tooltipBackgroundColor =
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.background.paper;
    const tooltipTextColor =
      theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.primary.main;
  
    return (
      <PageContainer>
        <Grid
          container
          spacing={3}
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: '80vh', animation: 'fadeIn 2s ease-out' }}
          
        >
          {levels.map((level, index) => (
            <Grid
              item
              key={index}
              style={{
                transform: `translateX(${waveOffsets[index]}px)`,
                position: 'relative',
              }}
            >
              {index === 0 && (
                // Hopping Tooltip for "Start Exercising"
                <div
                  style={{
                    position: 'absolute',
                    top: '-70px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    animation: 'hop 1.5s infinite',
                    zIndex: 2,
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      background: tooltipBackgroundColor, // Dynamic background color
                      color: tooltipTextColor, // Dynamic text color
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    Start Exercising
                    <div
                      style={{
                        position: 'absolute',
                        width: 0,
                        height: 0,
                        borderLeft: '6px solid transparent',
                        borderRight: '6px solid transparent',
                        borderTop: `6px solid ${tooltipBackgroundColor}`, // Match arrow with background
                        bottom: '-6px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }}
                    />
                  </div>
                </div>
              )}
  
              <Button
                variant="contained"
                style={{
                  backgroundColor: level.color === 'grey' ? greyColor : theme.palette[level.color].main,
                  width: 140,
                  height: 140,
                  borderRadius: '50%',
                  fontSize: '1.2rem',
                  boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
                onClick={() => {
                  if (index === 0) {
                    navigate('/exercise');  // Use React Router's navigate
                  }
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'scale(1.2)';
                  e.target.style.boxShadow = '0px 8px 20px rgba(0, 0, 0, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0px 6px 15px rgba(0, 0, 0, 0.2)';
                }}
              >
                {level.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </PageContainer>
    );
  };

const ReportsPage = () => {
    const dailyExerciseData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
        {
        label: 'Daily Exercise Count',
        data: [2, 1, 4, 4, 2, 6, 1], // Exercise counts for each day
        backgroundColor: '#4caf50', // Green color for the bars
        borderColor: '#388e3c', // Darker green for the bar borders
        borderWidth: 1,
        },
    ],
    };

    const options = {
    responsive: true,
    scales: {
        y: {
        beginAtZero: true,
        ticks: {
            stepSize: 1,
        },
        },
    },
    };

    return (
    <PageContainer>
        <Paper elevation={3} style={{ padding: 24 }}>
        <Typography variant="body1" color="textSecondary">
            Daily Exercise Count
        </Typography>

        {/* Bar Chart */}
        <div style={{ height: '400px', width: '100%', animation: 'fadeIn 1s ease-out' }}>
            <Bar data={dailyExerciseData} options={options} />
        </div>
        </Paper>
    </PageContainer>
    );
};

const Skeleton = styled('div')(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    content: '" "',
}));

export default function DashboardLayoutBasic(props) {
    const { window } = props;
    const router = useDemoRouter('/dashboard');

    const demoWindow = window ? window() : undefined;

    const renderContent = () => {
    switch (router.pathname) {
        case '/myAccount':
        return <ProfilePage />;
        case '/reports':
        default:  
        return <ReportsPage />;
        case '/dashboard':
        return <DashboardContent />;
    }
    };

    return (
    <AppProvider
        navigation={NAVIGATION}
        branding={{
          logo: <img src={AppLogoDark} alt="MUI logo" />,
          title: '',
        }}
        router={router}
        theme={demoTheme}
        window={demoWindow}
      logo={<img src={mindMotionIcon} alt="Mind Motion" style={{ width: 32, height: 32 }} />} // Updated logo
    >
        <DashboardLayout>{renderContent()}</DashboardLayout>
    </AppProvider>
    );
}
