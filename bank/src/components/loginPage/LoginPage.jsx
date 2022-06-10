import React from 'react';
import NavTabs from './tabs/NavTabs';
import NavBar from '../navBar/NavBar';
import { Divider, Grid, Input, Typography } from '@mui/material';
import Box from '@mui/material/Box';

export default function LoginPage () {
  return (
    <Box sx={{background : 'lightblue'}}>
      <Grid container>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid item xs={12}>
          <Grid container columnSpacing={4} sx={{justifyContent: 'center'}}>
            <NavTabs />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}