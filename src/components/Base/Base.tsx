import React from 'react';
import { Grid } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function Base() {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      flexGrow={1}
    >
      <Grid item>
        <WhatsAppIcon color="secondary" sx={{ fontSize: 100 }} />
      </Grid>
    </Grid>
  )
}
