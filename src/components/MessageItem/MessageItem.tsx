import React from 'react';
import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

const CustomItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  paddingInline: theme.spacing(2),
  paddingBlock: theme.spacing(1),
  maxWidth: '80%',
  [theme.breakpoints.up('lg')]: {
    maxWidth: '60%',
  },
  backgroundColor: theme.palette.secondary.main,
}));

interface MessageProps {
  isOut: boolean;
  text: string;
}

export default function MessageItem(props: MessageProps) {
  const { isOut, text } = props;

  return (
    <CustomItem sx={{
      alignSelf: isOut ? 'flex-end' : 'flex-start',
      bgcolor: !isOut ? '#fff' : ''
    }}>
      {text}
    </CustomItem>
  );
}
