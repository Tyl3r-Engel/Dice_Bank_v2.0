import React, { useState } from 'react';
import { Divider, Grid, Input, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import logo from './logo.png'
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors'

export default function NavBar () {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Grid container>
      <Grid item xs={5}>
        <img src={logo} alt='Logo' height={75}></img>
      </Grid>
      {
        isAuth ?
          (
            <>
            </>
          ) : (
            <>
            </>
          )
      }
    </Grid>
  )
}

