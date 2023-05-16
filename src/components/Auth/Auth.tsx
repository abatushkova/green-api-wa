import React, { useState } from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
  Container,
} from '@mui/material';

export default function Auth() {
  const [idInstance, setIdInstance] = useState('');
  const [tokenInstance, setTokenInstance] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <Box sx={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#d8f4cc'
    }}>
      <Container maxWidth="sm">
        <Paper sx={{ py: 5, px: 3 }}>
          <Typography variant="h1" mb={5} textAlign="center">WhatsApp Chat</Typography>
          <Grid
            component="form"
            noValidate
            autoComplete="off"
            container
            direction="column"
            // justifyContent="center"
            // alignItems="center"
            spacing={3}
            onSubmit={handleSubmit}
          >
            <Grid item>
              <TextField
                // error
                // helperText="Incorrect entry"
                id="idInstance"
                label="idInstance"
                variant="outlined"
                fullWidth
                value={idInstance}
                onChange={(e) => setIdInstance(e.target.value)}
                />
            </Grid>
            <Grid item>
              <TextField
                // error
                // helperText="Incorrect entry"
                id="apiTokenInstance"
                label="apiTokenInstance"
                variant="outlined"
                fullWidth
                value={tokenInstance}
                onChange={(e) => setTokenInstance(e.target.value)}
                />
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit" size="large" fullWidth>
                Get started
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
