import React from 'react';
import { Grid } from '@mui/material';
import NavBar from '../../navBar/NavBar';
import Footer from '../../footer/Footer';
import { CheckingAndSavingsInfo } from './CheckingAndSavingsInfo';
import ServiceElement from '../ServiceElement';
import { Box } from '@mui/system';
import backgroundImage from '../serviceBackground.png';
import useUser from '../../hooks/useUser';

export default function CheckingAndSavings() {
  const { windowSize } = useUser()
  return (
    <Grid container direction='column'>
    <Grid item xs={12} >
      <NavBar />
    </Grid>

    <Grid item xs={12}>
      <Box sx={{ backgroundImage : `url(${backgroundImage})`, padding : '1em'}}>
        {
          CheckingAndSavingsInfo.map((element, index) => {
            element.onSignUp = false;
            return (
              <ServiceElement
                key={`${index} casem`}
                element={element}
                size={
                  windowSize.width > 1300 ? 3
                  :
                    windowSize.width > 600 ? 2
                    :1
                }
              />
            )
          })
        }
      </Box>
    </Grid>

    <Grid item xs={12}>
      <Footer />
    </Grid>
  </Grid>
  )
}