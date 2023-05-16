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

interface IHeaderProps {
  onDrawerToggle: () => void;
}

export default function Header(props: IHeaderProps) {
  const { onDrawerToggle } = props;
  const theme = useTheme();

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
              12345
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
