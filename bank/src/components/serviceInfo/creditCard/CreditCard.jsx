import React from 'react';
import { Grid } from '@mui/material';
import NavBar from '../../navBar/NavBar';
import Footer from '../../footer/Footer';
import { CreditCardInfo } from './CreditCardInfo';
import ServiceElement from '../ServiceElement';
import { Box } from '@mui/system';
import backgroundImage from '../serviceBackground.png';

export default function CreditCard() {
  return (
    <Grid container direction='column'>
    <Grid item xs={12} >
      <NavBar />
    </Grid>

    <Grid item xs={12}>
      <Box sx={{ backgroundImage : `url(${backgroundImage})`, padding : '1em'}}>
        {
          CreditCardInfo.map((element, index) => <ServiceElement key={`${index} ccem`} element={element}/> )
        }
      </Box>
    </Grid>

    <Grid item xs={12}>
      <Footer />
    </Grid>
  </Grid>
  )
}