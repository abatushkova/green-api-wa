import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';
import Aside from '../Aside/Aside';
import Chat from '../Chat/Chat';
import Base from '../Base/Base';
import Header from '../Header/Header';
import { useAppSelector } from '../../app/hooks';
import { selectActiveChat } from '../../features/chat/chatSlice';

const drawerWidth = 320;

export default function Main() {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const selectedChat = useAppSelector(selectActiveChat);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ flex: 1, display: 'flex' }}>
      <Box sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        {isDesktop ? null : (
          <Aside
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        )}
        <Aside
          PaperProps={{ style: { width: drawerWidth } }}
          sx={{ display: { md: 'block', xs: 'none' } }}
        />
      </Box>
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header onDrawerToggle={handleDrawerToggle} />
        {selectedChat
          ? <Chat />
          : <Base />
        }
      </Box>
    </Box>
  );
}
