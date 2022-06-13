import React from 'react';
import NavTabs from './tabs/NavTabs';
import NavBar from '../navBar/NavBar';
import Login from '../login/Login'
import useWindowSize from '../hooks/useWindowSize';
import { Grid, Box, Paper } from '@mui/material';

export default function LoginPage () {
  const windowWidth = !(useWindowSize().width < 1120)
  return (
    <Grid container >
      <Grid item xs={12}>
        <Box sx={{background : 'lightgrey'}}>
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

      <Grid item xs={1} />

      <Grid item xs={3} sx={{padding: '1em'}}>
        <Login />
      </Grid>

      <Grid item xs={1} />

      <Grid item xs={6}>
          {/* <Advert /> */}
          <Box sx={{background : 'blue', height: '50', width: '50'}}>
            <Paper>tsetat</Paper>
          </Box>
      </Grid>

    </Grid>
  )
}