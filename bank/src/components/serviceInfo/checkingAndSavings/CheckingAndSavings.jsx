import React from 'react';
import { Grid } from '@mui/material';
import NavBar from '../../navBar/NavBar';
import Footer from '../../footer/Footer';
import { CheckingAndSavingsInfo } from './CheckingAndSavingsInfo';
import ServiceElement from '../ServiceElement';
import { Box } from '@mui/system';
import backgroundImage from '../serviceBackground.png';

export default function CheckingAndSavings() {
  return (
    <Grid container direction='column'>
    <Grid item xs={12} >
      <NavBar />
    </Grid>

    <Grid item xs={12}>
      <Box sx={{ backgroundImage : `url(${backgroundImage})`, padding : '1em'}}>
        {
          CheckingAndSavingsInfo.map((element, index) => <ServiceElement key={`${index} casem`} element={element}/> )
        }
      </Box>
    </Grid>

    <Grid item xs={12}>
      <Footer />
    </Grid>
  </Grid>
  )
}