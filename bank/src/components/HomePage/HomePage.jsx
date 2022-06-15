import React from 'react';
import NavTabs from './tabs/NavTabs';
import NavBar from '../navBar/NavBar';
import Login from './Login'
import Advert from './advert/Advert';
import checkmark from './checkmark.png';
import useWindowSize from '../hooks/useWindowSize';
import { Grid, Box, Paper, Typography } from '@mui/material';
import Footer from '../footer/Footer';

export default function LoginPage () {
  const windowWidth = !(useWindowSize().width < 1120)
  return (
    <Grid container >
      <Grid item xs={12}>
        <Box sx={{background : 'white'}}>
          <Grid container>
            <Grid item xs={12}>
              <NavBar windowWidth={windowWidth} />
            </Grid>
            {
              windowWidth &&
                (
                  <Grid item xs={12}>
                    <Grid container columnSpacing={4} sx={{justifyContent: 'center'}}>
                      <NavTabs />
                    </Grid>
                  </Grid>
                )
            }
          </Grid>
        </Box>
      </Grid>
      {
        windowWidth ?
          (
            <>
              <Grid item xs={1} />

              <Grid item xs={3} sx={{padding: '1em'}}>
                <Login />
              </Grid>

              <Grid item xs={7} sx={{padding: '1em'}}>
                <Advert />
              </Grid>

              <Grid item xs={1} />
            </>
          ) : (
            <>
              <Grid item xs={3} />
              <Grid item xs={6} sx={{padding: '1em'}}>
                <Login />
              </Grid>
              <Grid item xs={3} />

              <Grid item xs={3} />
              <Grid item xs={6} sx={{padding: '1em'}}>
                <Advert />
              </Grid>
              <Grid item xs={3} />
            </>
          )
      }

      <Grid item xs={12}>
        <Box sx={{
          backgroundColor : '#162337',
          margin : '3em',
          borderRadius: '50px'
          }}>
          <Grid container>
            <Grid item xs={12} md={5} sx={{textAlign : 'center', paddingTop : '1em'}}>
              <img src={checkmark} alt='checkmark' />
            </Grid>

            <Grid item xs={12} md={5} sx={{textAlign : 'center', alignSelf : 'center'}}>
              <Box sx={{
                backgroundColor : '#325765',
                padding : '1em',
                borderRadius: '24px'
              }} >
                <Paper sx={{padding : '1em'}}>
                  <Typography variant='h4'>
                    Don't take the chance with those other guys. Roll with us and save big at Dice Bank
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  )
}