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
import { deleteChat } from '../../features/chat/chatSlice';

const CustomListItem = styled(ListItem)(({ theme }) => ({
  '&.MuiListItem-secondaryAction': {
    paddingRight: 0,
  },
}));

interface IContactProps {
  phoneNumber: string;
  selected: string | null;
  onChatClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, S: string) => void;
}

export default function ChatItem(props: IContactProps) {
  const { phoneNumber, selected, onChatClick } = props;
  const dispatch = useAppDispatch();

  const handleDelete = () => dispatch(deleteChat(phoneNumber));

  return (
    <CustomListItem disablePadding>
      <ListItemButton
        selected={selected === phoneNumber}
        onClick={(e) => onChatClick(e, phoneNumber)}
      >
        <ListItemText>{phoneNumber}</ListItemText>
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
