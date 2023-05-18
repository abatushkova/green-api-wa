import React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import ContactItem from '../ChatItem/ChatItem';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getChatList, setActiveChat, activeChat } from '../../features/chat/chatSlice';

export default function ChatList() {
  const theme = useTheme();
  const chatList = useAppSelector(getChatList);
  const selectedChat = useAppSelector(activeChat);
  const dispatch = useAppDispatch();

  const handleChatSelect = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    phoneNumber: string,
  ) => {
    dispatch(setActiveChat(phoneNumber))
  };

  return (
    <Box sx={{
      flexGrow: 1,
      display: 'flex',
      flexDiraction: 'column',
      position: 'relative',
      bgcolor: theme.palette.white.main
    }}>
      <List disablePadding sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'auto'
      }}>
        {chatList.length ? (
          chatList.map(({ phoneNumber }) => (
            <ContactItem
              key={phoneNumber}
              phoneNumber={phoneNumber}
              selected={selectedChat}
              onChatClick={handleChatSelect}
            />
          ))
        ) : (
          <ListItem >
            <ListItemText>Контактов нет</ListItemText>
          </ListItem>
        )}
      </List>
    </Box>
  );
}
