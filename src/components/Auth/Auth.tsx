import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
  Container,
} from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { login } from '../../features/auth/authSlice';
import { IUser } from "../../app/types";

export default function Auth() {
  const theme = useTheme();
  const [isEmpty, setIsEmpty] = useState(false);
  const [authForm, setAuthForm] = useState<IUser>({
    idInstance: '',
    apiTokenInstance: '',
  });
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthForm({
      ...authForm,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!authForm.idInstance || !authForm.apiTokenInstance) {
      setIsEmpty(true);
      return;
    };

    dispatch(login(authForm));
    setAuthForm({
      idInstance: '',
      apiTokenInstance: '',
    });
    setIsEmpty(false);
  };

  const hasError = (authInput: string): boolean => {
    return isEmpty && !authInput;
  }

  return (
    <Box sx={{
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: theme.palette.secondary.main
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
            spacing={3}
            onSubmit={handleSubmit}
          >
            <Grid item>
              <TextField
                error={hasError(authForm.idInstance) ?? 'true'}
                helperText={hasError(authForm.idInstance) ? 'Please enter idInstance' : null}
                name="idInstance"
                label="idInstance"
                variant="outlined"
                fullWidth
                value={authForm.idInstance}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                error={hasError(authForm.apiTokenInstance) ?? 'true'}
                helperText={hasError(authForm.apiTokenInstance) ? 'Please enter apiTokenInstance' : null}
                name="apiTokenInstance"
                label="apiTokenInstance"
                variant="outlined"
                fullWidth
                value={authForm.apiTokenInstance}
                onChange={handleChange}
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
