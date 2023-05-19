import React from 'react';
import { Box } from '@mui/material';
import ChatPreview from '../ChatPreview/ChatPreview';
import ChatInput from '../ChatInput/ChatInput';
import Header from '../Header/Header';

interface ChatProps {
  onDrawerClick: () => void;
}

export default function Chat(props: ChatProps) {
  const { onDrawerClick } = props;

  return (
    <>
      <Header onDrawerToggle={onDrawerClick} />
      <Box component="main" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <ChatPreview />
        <ChatInput />
      </Box>
    </>
  );
}