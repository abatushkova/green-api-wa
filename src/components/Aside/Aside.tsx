import React from 'react';
import { Drawer, DrawerProps } from '@mui/material';
import User from '../User/User';
import ChatItemAdd from '../ChatItemAdd/ChatItemAdd';
import ChatList from '../ChatList/ChatList';

export default function Aside(props: DrawerProps) {
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <User />
      <ChatItemAdd />
      <ChatList />
    </Drawer>
  );
}
