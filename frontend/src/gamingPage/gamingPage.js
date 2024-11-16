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
import TimerIcon from '@mui/icons-material/Timer';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import "./css/gamingPage.css";

const GamingPage = () => {
  const drawerWidth = 240;
  const navigate = useNavigate(); // For navigating back

  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundImage: `linear-gradient(135deg, #0a1e3a 50%, #152a45 50%)`,
          },
        },
      },
    },
  });

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

  };

  const goToStage2 = () => {

  };

  const goToStage3 = () => {

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
          <Typography variant="h6" noWrap component="div">
            Mind & Motion
          </Typography>
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
          <Divider />
        </List>

      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <Toolbar />
        <Typography sx={{ marginBottom: 2, textAlign: 'center', fontWeight: 'bold' }}>
          Stage
        </Typography>
        <Box sx={{ }}>
        <div className="video-container">
          <video src=''> 
          </video>
        </div>
        <Typography sx={{marginTop: "20px", textAlign: 'center'}}>
          Stage description
        </Typography>
        </Box>
      </Box>
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
        anchor="right"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: 'block', marginTop: "10px", marginBottom: "10px"  }} className="nav_bar_button">
            <ListItemButton onClick={goToStage1} sx={{ minHeight: 48, px: 2.5, justifyContent: 'initial' }}>
              <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', mr: 3 }}>
                <TimerIcon sx={{  }}/>
              </ListItemIcon>
              <ListItemText primary="Time" primaryTypographyProps={{ style: text }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block', marginTop: "10px", marginBottom: "10px"  }} className="nav_bar_button">
            <ListItemButton onClick={goToStage2}sx={{ minHeight: 48, px: 2.5, justifyContent: 'initial' }}>
              <ListItemIcon sx={{ minWidth: 0, justifyContent: 'center', mr: 3 }}>
                <SportsScoreIcon sx={{  }} />
              </ListItemIcon>
              <ListItemText primary="Score" primaryTypographyProps={{ style: text }} />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      </Drawer>
    </Box>
    </ThemeProvider>
    </section>
  );
}

export default GamingPage;
