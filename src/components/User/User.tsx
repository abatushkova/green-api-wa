import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Grid,
  Avatar,
  IconButton,
} from '@mui/material';
import Logout from '@mui/icons-material/Logout';

const CustomAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

export default function User() {
  const handleUserLogout = () => {
    console.log('logout');
  };

  return (
    <Grid container alignItems="center" spacing={1} sx={{ py: 1, px: 2 }}>
      <Grid item>
        <CustomAvatar />
      </Grid>
      <Grid item xs />
      <Grid item>
        <IconButton
          aria-label="Logout"
          onClick={handleUserLogout}
        >
          <Logout />
        </IconButton>
      </Grid>
    </Grid>
  )
}
