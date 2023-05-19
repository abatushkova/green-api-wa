import React from 'react';
import {
  Alert,
  Snackbar,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { emptyErrorMessage, selectError } from '../../features/chat/chatSlice';

interface ErrorProps {
  message: string;
}

export default function Error(props: ErrorProps) {
  const { message } = props;
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);

  const handleClose = () => {
    dispatch(emptyErrorMessage());
  }

  return (
    <>
      <Snackbar open={!!error} anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          elevation={4}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
