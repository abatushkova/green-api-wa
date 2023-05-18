import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadMessages, selectActiveChat } from '../../features/chat/chatSlice';
import { selectUser } from '../../features/auth/authSlice';
import MessageItem from '../MessageItem/MessageItem';

export default function MessageList() {
  const dispatch = useAppDispatch();
  const selectedChat = useAppSelector(selectActiveChat);
  const activeChat = useAppSelector(state => (
    state.chat.chatList.find(({ phoneNumber }) => phoneNumber === selectedChat)
  ));
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(loadMessages(user));
  }, [dispatch, user]);

  return (
    <Stack
      spacing={2}
      direction="column"
      justifyContent="flex-end"
      sx={{ height: '100%' }}
    >
      {activeChat?.messages.map((message, index) => (
        <MessageItem
          key={index}
          isOut={message.isMine}
          text={message.text}
        />
      ))}
    </Stack>
  );
}
