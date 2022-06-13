import React, { useEffect } from 'react';
import NavTabs from './tabs/NavTabs';
import NavBar from '../navBar/NavBar';
import useWindowSize from '../hooks/useWindowSize';
import { Divider, Grid, Input, Typography } from '@mui/material';
import Box from '@mui/material/Box';

export default function LoginPage () {
  const windowWidth = !(useWindowSize().width < 1105)
  return (
    <Box sx={{background : 'lightblue'}}>
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
  )
}