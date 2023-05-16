import React from 'react';
import { Drawer, DrawerProps } from '@mui/material';
import User from '../User/User';
import ContactAdd from '../ContactAdd/ContactAdd';
import ContactList from '../ContactList/ContactList';

export default function Aside(props: DrawerProps) {
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <User />
      <ContactAdd />
      <ContactList />
    </Drawer>
  );
}
