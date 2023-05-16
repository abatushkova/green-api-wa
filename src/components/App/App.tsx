import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Auth from '../Auth/Auth';
import Main from '../Main/Main';

export default function App() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      {/* <Auth /> */}
      <Main />
    </Box>
  );
}
