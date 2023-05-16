import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Auth from '../Auth/Auth';

export default function App() {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyConent: 'center',
      minHeight: '100vh',
      backgroundColor: '#d8f4cc',
    }}>
      <CssBaseline />
      <Auth />
    </Box>
  );
}
