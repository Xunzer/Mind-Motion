import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import "./css/gamingPage.css";
import PoseDetection from "../pose_detection/pose_detection"; // Import the PoseDetection component
import { useState } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppLogo from '../assets/app_logo.png';

const GamingPage = () => {
  const drawerWidth = 240;
  const navigate = useNavigate(); // For navigating back
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(prefersDarkMode || true); // Default to dark mode
  const [currentStage, setCurrentStage] = useState("Stage1"); // State to track the currently rendered stage

  const theme = createTheme({
    palette: {
      mode: mode ? "dark" : "light",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: mode
            ? {
                backgroundImage: `linear-gradient(135deg, #0a1e3a 50%, #152a45 50%)`,
                height: '100%',
                minHeight: '100vh',
                margin: 0, // Remove any default margin
                padding: 0,
              }
            : {
              height: '100%',
              minHeight: '100vh',
              margin: 0, // Remove any default margin
              padding: 0,
              }, // No styles for light mode
        },
      },
    },
  });

  const handleChange = () => {
    if (mode) {
      setMode(false);
    } else {
      setMode(true);
    }
  };

  const text = {
    fontWeight: 'bold'
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const goToStage1 = () => {
    setCurrentStage("Stage1")

  };

  const goToStage2 = () => {
    setCurrentStage("Stage2")

  };

  const goToStage3 = () => {
    setCurrentStage("Stage3")

  };

  const goToStage4 = () => {
    setCurrentStage("Stage4")

  };

  const goToStage5 = () => {
    setCurrentStage("Stage5")

  };

  const exerciseNames = {
    Stage1: "Right Bicep Curl",
    Stage2: "Left Bicep Curl",
    Stage3: "Right Knee Extension",
    Stage4: "Left Knee Extension",
    Stage5: "Open Arms"
  };


  const renderStageContent = () => {
    switch (currentStage) {
      case 'Stage1':
        return <PoseDetection key="Stage1" exercise="rightBicepCurl" />;
      case 'Stage2':
        return <PoseDetection key="Stage2" exercise="leftBicepCurl" />;
      case 'Stage3':
        return <PoseDetection key="Stage3" exercise="rightKneeExtension" />;
      case 'Stage4':
        return <PoseDetection key="Stage4" exercise="leftKneeExtension" />;
      case 'Stage5':
        return <PoseDetection key="Stage5" exercise="openArms" />;
      default:
        return <Typography style={{ color: 'white' }}>Press Exercise 1 to Start!</Typography>;
    }
  };

  const returnDashboard = () => {
    navigate(-1);
  };

  return (
    <section className="gaming-page-container">
    <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex' }} >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <img
            src={AppLogo}
            alt="Logo"
            style={{ height: '40px', cursor: 'pointer' }} // Style as needed
            onClick={() => navigate('/dashboard')} // Optional: Navigate to home on click
          />
          <Box sx={{ marginLeft: 'auto' }}>
            <IconButton onClick={handleChange} color="inherit">
              {mode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar> 
        <DrawerHeader sx={{display: 'flex', flexDirection: "row"}}>
          <Box>
            <Typography id='left_bar_drawer_title'>Go to dashboard</Typography>
          </Box>
          <IconButton onClick={returnDashboard} sx={{marginLeft: "5px"}}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        </Toolbar>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: 'block', marginTop: "10px", marginBottom: "10px"  }} className="nav_bar_button">
            <ListItemButton onClick={goToStage1} sx={{ minHeight: 48, px: 2.5, justifyContent: 'initial' }}>
              <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', mr: 3 }}>
                <LooksOneIcon sx={{  }}/>
              </ListItemIcon>
              <ListItemText primary="Exercise 1" primaryTypographyProps={{ style: text }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block', marginTop: "10px", marginBottom: "10px" }} className="nav_bar_button">
            <ListItemButton onClick={goToStage2}sx={{ minHeight: 48, px: 2.5, justifyContent: 'initial' }}>
              <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', mr: 3 }}>
                <LooksTwoIcon sx={{  }} />
              </ListItemIcon>
              <ListItemText primary="Exercise 2" primaryTypographyProps={{ style: text }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block', marginTop: "10px", marginBottom: "10px"  }} className="nav_bar_button">
            <ListItemButton onClick={goToStage3} sx={{ minHeight: 48, px: 2.5, justifyContent: 'initial' }}>
              <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', mr: 3 }}>
                <Looks3Icon sx={{  }} />
              </ListItemIcon>
              <ListItemText primary="Exercise 3" primaryTypographyProps={{ style: text }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block', marginTop: "10px", marginBottom: "10px"  }} className="nav_bar_button">
            <ListItemButton onClick={goToStage4} sx={{ minHeight: 48, px: 2.5, justifyContent: 'initial' }}>
              <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', mr: 3 }}>
                <Looks4Icon sx={{  }}/>
              </ListItemIcon>
              <ListItemText primary="Exercise 4" primaryTypographyProps={{ style: text }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block', marginTop: "10px", marginBottom: "10px"  }} className="nav_bar_button">
            <ListItemButton onClick={goToStage5} sx={{ minHeight: 48, px: 2.5, justifyContent: 'initial' }}>
              <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', mr: 3 }}>
                <Looks5Icon sx={{  }}/>
              </ListItemIcon>
              <ListItemText primary="Exercise 5" primaryTypographyProps={{ style: text }} />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>

      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <Toolbar />
        <Typography sx={{ marginBottom: 2, textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}>
          {exerciseNames[currentStage]}
        </Typography>
        <Box sx={{ }}>
        <div className="video-container">
          {renderStageContent()}
        </div>
        </Box>
      </Box>
      {/* <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Toolbar />
        <Divider />
        <List>

          <ListItem disablePadding sx={{ display: 'block', marginTop: "10px", marginBottom: "10px"  }} className="nav_bar_button">
            <ListItemButton sx={{ minHeight: 48, px: 2.5, justifyContent: 'initial' }}>
              <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', mr: 3 }}>
                <SportsScoreIcon sx={{  }} />
              </ListItemIcon>
              <ListItemText primary="Score" primaryTypographyProps={{ style: text }} />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      </Drawer> */}
    </Box>
    </ThemeProvider>
    </section>
  );
}

export default GamingPage;
