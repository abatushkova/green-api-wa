import React, { useState, useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Auth from '../Auth/Auth';
import Main from '../Main/Main';
import { useAppSelector } from '../../app/hooks';
import { selectError } from '../../features/chat/chatSlice';
import { selectUser } from '../../features/auth/authSlice';
import Error from '../Error/Error';

export default function App() {
  const user = useAppSelector(selectUser);
  const error = useAppSelector(selectError);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (user.idInstance && user.apiTokenInstance) {
      setIsLoggedIn(true);
      return;
    }

    setIsLoggedIn(false);
  }, [user, error]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      {isLoggedIn
        ? <Main />
        : <Auth />
      }
      {error ? <Error message={error} /> : null}
    </Box>
  );
}
