import React from 'react';
import { Grid } from '@mui/material';
import NavBar from '../navBar/NavBar';
import Footer from '../footer/Footer';

export default function CheckingAndSavings() {
  return (
    <Grid container direction='column'>
    <Grid item xs={12} >
      <NavBar />
    </Grid>

    <Grid item xs={12} sx={{padding : '2em'}}>
      CheckingAndSavings
    </Grid>

    <Grid item xs={12}>
      <Footer />
    </Grid>
  </Grid>
  )
}