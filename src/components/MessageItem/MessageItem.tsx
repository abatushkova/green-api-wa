import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Paper } from '@mui/material';

const CustomItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  paddingInline: theme.spacing(2),
  paddingBlock: theme.spacing(1),
  minHeight: theme.spacing(5),
  maxWidth: '80%',
  [theme.breakpoints.up('lg')]: {
    maxWidth: '60%',
  },
}));

interface MessageProps {
  isOut: boolean;
  text: string;
}

export default function MessageItem(props: MessageProps) {
  const { isOut, text } = props;
  const theme = useTheme();

  return (
    <CustomItem sx={{
      alignSelf: isOut ? 'flex-end' : 'flex-start',
      bgcolor: isOut ? `${theme.palette.secondary.main}` : `${theme.palette.white.main}`
    }}>
      {text}
    </CustomItem>
  );
}
