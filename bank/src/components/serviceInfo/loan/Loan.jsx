import React from 'react';
import { Grid } from '@mui/material';
import NavBar from '../../navBar/NavBar';
import Footer from '../../footer/Footer';
import { LoanInfo } from './LoanInfo';
import ServiceElement from '../ServiceElement';
import { Box } from '@mui/system';
import backgroundImage from '../serviceBackground.png';

export default function Loan() {
  return (
    <Grid container direction='column'>
    <Grid item xs={12} >
      <NavBar />
    </Grid>

    <Grid item xs={12}>
      <Box sx={{ backgroundImage : `url(${backgroundImage})`, padding : '1em'}}>
        {
          LoanInfo.map((element, index) =>{ element.noSignUp = false; return <ServiceElement key={`${index} ccem`} element={element}/> })
        }
      </Box>
    </Grid>

    <Grid item xs={12}>
      <Footer />
    </Grid>
  </Grid>
  )
}