import React, { useState } from 'react';
import NavBarMenu from './NavMenu';
import { Divider, Grid, Input, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import logo from './logo.png'
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors'


export default function NavBar ({windowWidth}) {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <Grid container>
      <Grid item xs={7}>
        <img src={logo} alt='Logo' height={75}></img>
      </Grid>
      <Grid item xs={4} />
      <Grid item xs={1} sx={{alignSelf: 'center'}}>
        {
          !windowWidth &&
            (
              <NavBarMenu />
            )
        }
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