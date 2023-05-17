import React, { useState, useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Auth from '../Auth/Auth';
import Main from '../Main/Main';
import { useAppSelector } from '../../app/hooks';

export default function App() {
  const authState = useAppSelector(state => state.auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (authState.idInstance && authState.apiTokenInstance) {
      setIsLoggedIn(true);
      return;
    }

    setIsLoggedIn(false);
  }, [authState]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      {isLoggedIn ? (
        <Main />
      ) : (
        <Auth />
      )}
    </Box>
  );
}
