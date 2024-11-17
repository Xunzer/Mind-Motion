import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import mindMotionIcon from './assets/mindMotion.png'; // Ensure the correct path to the image file
import { useTheme } from '@mui/material/styles'; // Import useTheme to access the current theme
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import logoImage from './assets/logo.jpg';

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
    <Paper elevation={3} style={{ padding: 24 }}>
        <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={4}>
            <Avatar
            alt="User Name"
            src = {logoImage}
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
            <Button variant="contained" color="primary" style={{ marginTop: 16 }}>
            Edit Profile
            </Button>
        </Grid>
        </Grid>
    </Paper>
    </PageContainer>
);
const DashboardContent = () => {
    const theme = useTheme(); // Access the current theme

    const levels = [
    { name: 'Level 1', color: 'primary' },
    { name: 'Level 2', color: 'grey' },
    { name: 'Level 3', color: 'grey' },
    { name: 'Level 4', color: 'grey' },
    { name: 'Level 5', color: 'grey' },
    { name: 'Level 6', color: 'grey' },
    ];

  const waveOffsets = [0, 40, -40, 40, -40, 40]; // Wave pattern for vertical effect

  // Use the grey palette from the theme to ensure it's responsive to both light and dark mode
  const greyColor = theme.palette.grey[500]; // grey.500 is a neutral grey color for both modes

    return (
    <PageContainer>
        <Grid
        container
        spacing={3}
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '80vh' }} // Center vertically on the page
        >
        {levels.map((level, index) => (
            <Grid
            item
            key={index}
            style={{
              transform: `translateX(${waveOffsets[index]}px)`, // Apply horizontal offset for vertical wave
            }}
            >
            <Button
                variant="contained"
                style={{
                backgroundColor: level.color === 'grey' ? greyColor : theme.palette[level.color].main, // Apply grey or the primary color
                width: 140, // Larger width
                height: 140, // Larger height
                borderRadius: '50%',
                fontSize: '1.2rem',
                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
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
        <Typography variant="h4" gutterBottom>
            Reports
        </Typography>
        <Typography variant="body1" color="textSecondary">
            Daily Exercise Count
        </Typography>

        {/* Bar Chart */}
        <div style={{ height: '400px', width: '100%' }}>
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
        return <ReportsPage />;
        case '/dashboard':
        default:
        return <DashboardContent />;
    }
    };

    return (
    <AppProvider
        navigation={NAVIGATION}
        router={router}
        theme={demoTheme}
        window={demoWindow}
      logo={<img src={mindMotionIcon} alt="Mind Motion" style={{ width: 32, height: 32 }} />} // Updated logo
    >
        <DashboardLayout>{renderContent()}</DashboardLayout>
    </AppProvider>
    );
}
