import React, { useRef, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import MessageList from '../MessageList/MessageList';
import { useAppSelector } from '../../app/hooks';
import { selectActiveChat } from '../../features/chat/chatSlice';

export default function ChatPreview() {
  const theme = useTheme();
  const selectedChat = useAppSelector(selectActiveChat);
  const messageEndRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView();
    }
  }, [selectedChat]);

  return (
    <Box sx={{
      flexGrow: 1,
      display: 'flex',
      position: 'relative',
      bgcolor: theme.palette.secondary.light
    }}>
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'auto',
        py: 2,
        px: { xs: 2, md: 5 }
      }}>
        <MessageList />
        <Box ref={messageEndRef} />
      </Box>
    </Box>
  );
}
