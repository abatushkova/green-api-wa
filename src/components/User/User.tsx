import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Grid,
  Avatar,
  IconButton,
} from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';

const CustomAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

export default function User() {
  const dispatch = useAppDispatch();

  const handleUserLogout = () => {
    dispatch(logout());
  };

  return (
    <Grid container alignItems="center" sx={{ py: 1, px: 2 }}>
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
  );
}
