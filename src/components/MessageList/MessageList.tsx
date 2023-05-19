import React, { useEffect, useRef } from 'react';
import { Stack, Box } from '@mui/material';
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
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      dispatch(loadMessages(user));

      if (chatRef.current) {
        chatRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }

    return () => {
      ignore = true;
    }
  }, [dispatch, user, activeChat]);

  return (
    <Stack
      spacing={2}
      direction="column"
      sx={{ py: 2 }}
    >
      {activeChat?.messages.map((message, index) => (
        <MessageItem
          key={index}
          isOut={message.isMine}
          text={message.text}
        />
      ))}
      <Box ref={chatRef} />
    </Stack>
  );
}
