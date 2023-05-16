import React, { useRef, useEffect } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Stack,
  Paper,
} from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  paddingInline: theme.spacing(2),
  paddingBlock: theme.spacing(1),
  maxWidth: '80%',
  [theme.breakpoints.up('lg')]: {
    maxWidth: '60%',
  },
}));

interface IMessage {
  value: string;
}

const fakeMessages: IMessage[] = [
  {
    value: `Beautiful by default: we're meticulous about our implementation of Material Design, ensuring that every Material UI component meets the highest standards of form and function, but diverge from the official spec where necessary to provide multiple great options.`
  },
  {
    value: `Beautiful by default: we're meticulous about our implementation of Material Design, ensuring that every Material UI component meets the highest standards of form and function, but diverge from the official spec where necessary to provide multiple great options.`
  },
  {
    value: `Beautiful by default: we're meticulous about our implementation of Material Design, ensuring that every Material UI component meets the highest standards of form and function, but diverge from the official spec where necessary to provide multiple great options.`
  },
  {
    value: `Beautiful by default: we're meticulous about our implementation of Material Design, ensuring that every Material UI component meets the highest standards of form and function, but diverge from the official spec where necessary to provide multiple great options.`
  },
]

export default function ChatPreview() {
  const theme = useTheme();
  const messageEndRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView();
    }
  }, [fakeMessages]);

  return (
    <Box sx={{
      flexGrow: 1,
      display: 'flex',
      position: 'relative',
      bgcolor: theme.palette.secondary.light
    }}>
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'auto',
        py: 2,
        px: { xs: 2, md: 5 }
      }}>
        <Stack spacing={2} direction="column">
          {fakeMessages.map((message, index) => (
            <Item key={index}>
              {message.value}
            </Item>
          ))}
          <Item sx={{ alignSelf: 'flex-end', bgcolor: theme.palette.secondary.main }}>
            Material UI and Base UI feature many of the same UI components, but Base UI comes without any default styles or styling solutions.
            Material UI is comprehensive in that it comes packaged with default styles, and is optimized to work with Emotion (or styled-components).
            Base UI, by contrast, could be considered the "skeletal" or "headless" counterpart to Material UI—in fact, future versions of Material UI will use Base UI components and hooks for its foundational structure.
          </Item>
        </Stack>
        <Box ref={messageEndRef} />
      </Box>
    </Box>
  );
}
