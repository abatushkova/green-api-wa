import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  IconButton,
  Stack,
  TextField,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch } from '../../app/hooks';
import { addChat } from '../../features/chat/chatSlice';
import { checkNumber, createNewNumber } from '../../utils/helpers/handleNumber';

export default function ChatItemAdd() {
  const theme = useTheme();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState('typing');
  const dispatch = useAppDispatch();

  const setErrorMsg = () => {
    if (status === 'error' && !phoneNumber) return 'Please enter phone number';
    if (status === 'error') return 'Incorrect phone number';

    return '';
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus('typing');
    setPhoneNumber(e.target.value);
  }

  const handleSubmit =(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!phoneNumber.trim()) {
      setStatus('error');
      return;
    }

    if (checkNumber(phoneNumber)) {
      const newPhoneNumber = createNewNumber(phoneNumber);

      dispatch(
        addChat(newPhoneNumber)
      );
      setStatus('success');
      setPhoneNumber('');
    } else {
      setStatus('error');
      return;
    }
  };

  return (
    <>
      <Stack
        direction="row" alignItems="center"
        spacing={1}
        sx={{ py: 1.5, px: 2, bgcolor: theme.palette.white.main }}
        component="form"
        noValidate
        onSubmit={handleSubmit}
      >
        <TextField
          error={status === 'error' ?? 'true'}
          helperText={setErrorMsg()}
          label="Add phone number"
          variant="outlined"
          size="small" fullWidth
          value={phoneNumber}
          onChange={handleChange}
        />
        <IconButton
          aria-label="Add"
          type="submit"
        >
          <AddIcon />
        </IconButton>
      </Stack>
      <Divider />
    </>
  );
}
