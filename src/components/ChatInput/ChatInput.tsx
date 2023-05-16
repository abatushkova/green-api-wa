import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function ChatInput() {
  const theme = useTheme();
  const [message, setMessage] = useState('');

  const handleSubmit =(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    console.log('message sent');
    setMessage('');
  };

  return(
    <Stack
      direction="row" alignItems="center"
      spacing={1}
      sx={{ py: 1.5, px: 2, bgcolor: theme.palette.gray.main }}
      component="form"
      noValidate
      onSubmit={handleSubmit}
    >
      <TextField
        placeholder="Type a message"
        variant="outlined"
        multiline
        size="small" fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <IconButton
        aria-label="Send"
        type="submit"
      >
        <SendIcon />
      </IconButton>
    </Stack>
  );
}
