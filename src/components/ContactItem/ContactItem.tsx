import React from 'react';
import { styled } from '@mui/material/styles';
import {
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '../../app/hooks';
import { deleteContact } from '../../features/contacts/contactsSlice';

const CustomListItem = styled(ListItem)(({ theme }) => ({
  '&.MuiListItem-secondaryAction': {
    paddingRight: 0,
  },
}));

interface IContactProps {
  number: string;
  selected: number;
  index: number;
  onContactClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, S: number) => void;
}

export default function ContactItem(props: IContactProps) {
  const { index, number, selected, onContactClick } = props;
  const dispatch = useAppDispatch();

  const handleDelete = () => dispatch(deleteContact(number));

  return (
    <CustomListItem disablePadding>
      <ListItemButton
        selected={selected === index}
        onClick={(e) => onContactClick(e, index)}
      >
        <ListItemText>{number}</ListItemText>
      </ListItemButton>
      <ListItemSecondaryAction className="hidden-menu">
        <IconButton
          edge="end"
          aria-label="Delete"
          size="small"
          onClick={handleDelete}
          sx={{ mr: 0.5 }}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </ListItemSecondaryAction>
    </CustomListItem>
  );
}
