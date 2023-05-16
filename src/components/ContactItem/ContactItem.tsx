import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

interface IContactProps {
  number: number;
  selected: number;
  index: number;
  onContactClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, S: number) => void;
}

export default function ContactItem(props: IContactProps) {
  const { index, number, selected, onContactClick } = props;

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          selected={selected === index}
          onClick={(e) => onContactClick(e, index)}
        >
          <ListItemText>{number}</ListItemText>
        </ListItemButton>
      </ListItem>
    </>
  );
}
