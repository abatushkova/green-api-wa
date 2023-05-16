import React from 'react';
import { Drawer, DrawerProps } from '@mui/material';
import User from '../User/User';
// import ContactList from '../ContactList/ContactList';
// import ContactAdd from '../ContactAdd/ContactAdd';

export default function Aside(props: DrawerProps) {
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <User />
      {/* <ContactAdd /> */}
      {/* <ContactList /> */}
    </Drawer>
  );
}
