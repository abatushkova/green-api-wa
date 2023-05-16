import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  IconButton,
  Stack,
  TextField,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export default function ContactAdd() {
  const theme = useTheme();
  const [number, setNumber] = useState('');

  const handleSubmit =(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('contact added');
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
          // error
          // helperText="Incorrect number"
          label="Add number"
          variant="outlined"
          size="small" fullWidth
          value={number}
          onChange={(e) => setNumber(e.target.value)}
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
