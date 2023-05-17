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
import { addContact } from '../../features/contacts/contactsSlice';
import { checkNumber, createNewNumber } from '../../utils/helpers/initNumber';
import { createChatId } from '../../utils/helpers/createChatId';

export default function ContactAdd() {
  const theme = useTheme();
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState('typing');
  const dispatch = useAppDispatch();

  const setErrorMsg = () => {
    if (status === 'error' && !number) return 'Please enter phone number';
    if (status === 'error') return 'Incorrect number';

    return '';
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus('typing');
    setNumber(e.target.value);
  }

  const handleSubmit =(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!number.trim()) {
      setStatus('error');
      return;
    }

    if (checkNumber(number)) {
      const newNumber = createNewNumber(number);
      const chatId = createChatId(newNumber);

      dispatch(
        addContact({
          chatId,
          phoneNumber: newNumber,
        })
      );
      setStatus('success');
      setNumber('');
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
          label="Add number"
          variant="outlined"
          size="small" fullWidth
          value={number}
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
