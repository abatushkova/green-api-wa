import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Container } from '@mui/material';
import MessageList from '../MessageList/MessageList';

export default function ChatPreview() {
  const theme = useTheme();

  return (
    <Box sx={{
      flexGrow: 1,
      display: 'flex',
      position: 'relative',
      bgcolor: theme.palette.secondary.light
    }}>
      <Container sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'auto',
      }}>
        <MessageList />
      </Container>
    </Box>
  );
}
