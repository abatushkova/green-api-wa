import React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  AppBar,
  IconButton,
  Toolbar,
  Grid,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppSelector } from '../../app/hooks';
import { selectActiveChat } from '../../features/chat/chatSlice';

interface HeaderProps {
  onDrawerToggle: () => void;
}

export default function Header(props: HeaderProps) {
  const { onDrawerToggle } = props;
  const theme = useTheme();
  const selectedChat = useAppSelector(selectActiveChat);

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item sx={{ display: { md: 'none', xs: 'block' } }}>
            <IconButton
              aria-label="Open navbar"
              edge="start"
              onClick={onDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography component="h1" hidden>WhatsApp Chat</Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{ color: theme.palette.primary.main }}
            >
              +{selectedChat}
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
