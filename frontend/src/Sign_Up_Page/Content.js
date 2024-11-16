import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import SitemarkIcon from '@mui/icons-material/AccountTree';  //TODO This can be logo
import Divider from '@mui/material/Divider';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
const items = [
  {
    icon: <SupervisorAccountOutlinedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Rehabilitation Support',
    description:
      'Our service help stroke patients regain motor skills through targeted hand and body exercises designed for different recovery stages.',
  },
  {
    icon: <AccessibilityNewIcon sx={{ color: 'text.secondary' }} />,
    title: ' Real-Time Motion Tracking',
    description:
      'Track and guide precise body and hand movements in real-time for effective therapy.',
  },
  {
    icon: <ChecklistOutlinedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Progress Analytics',
    description:
      'Provide detailed insights into recovery by tracking motion accuracy, consistency, and progress towards rehabilitation goals.',
  },
  {
    icon: <ExtensionOutlinedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Gamified Engagement',
    description:
      'Transform therapy into an enjoyable experience with interactive games and rewards, encouraging regular participation and sustained motivation.',
  },
];

export default function Content() {
  return (
    <Stack
      sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}
    > 
     <Divider
        orientation="vertical"
        flexItem
        sx={{
          backgroundColor: 'white', // Set the divider's color
          width: '2px', // Adjust the thickness
          alignSelf: 'stretch', // Ensure it spans the height of the container
        }}
      />
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <FlagOutlinedIcon />
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}