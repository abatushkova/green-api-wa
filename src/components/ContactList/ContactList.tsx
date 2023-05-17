import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import ContactItem from '../ContactItem/ContactItem';
import { useAppSelector } from '../../app/hooks';
import { getContacts } from '../../features/contacts/contactsSlice';

export default function ContactList() {
  const theme = useTheme();
  const [selectedContact, setSelectedContact] = useState(-1);
  const contacts = useAppSelector(getContacts);

  const handleContactSelect = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedContact(index);
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
        {contacts.length ? (
          contacts.map(({chatId, phoneNumber}, index) => (
            <ContactItem
              key={chatId}
              index={index}
              number={phoneNumber}
              selected={selectedContact}
              onContactClick={handleContactSelect}
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
