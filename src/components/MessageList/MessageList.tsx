import React, { useEffect, useRef } from 'react';
import { Stack, Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadMessages, selectActiveChat, selectUpdatedAt } from '../../features/chat/chatSlice';
import { selectUser } from '../../features/auth/authSlice';
import MessageItem from '../MessageItem/MessageItem';

export default function MessageList() {
  const dispatch = useAppDispatch();
  const selectedChat = useAppSelector(selectActiveChat);
  const activeChatItem = useAppSelector(state => (
    state.chat.chatList.find(({ phoneNumber }) => phoneNumber === selectedChat)
  ));
  const user = useAppSelector(selectUser);
  const updatedAt = useAppSelector(selectUpdatedAt);
  const chatRef = useRef<HTMLDivElement>(null);
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      dispatch(loadMessages(user));
    }

    didMount.current = true;
  }, [dispatch, user, updatedAt]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeChatItem]);

  return (
    <Stack
      spacing={2}
      direction="column"
      sx={{ py: 2 }}
    >
      {activeChatItem?.messages.map((message, index) => (
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
