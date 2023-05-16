import React from 'react';
import { Box } from '@mui/material';
import ChatPreview from '../ChatPreview/ChatPreview';
import ChatInput from '../ChatInput/ChatInput';

export default function Content() {
  return (
    <Box component="main" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <ChatPreview />
      <ChatInput />
    </Box>
  );
}
