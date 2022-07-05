import React from 'react';
import NavMenu from './NavMenu';
import { Grid, Stack } from '@mui/material';
import logo from './logo.png'
import NavUserMenu from './NavUserMenu';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';


export default function NavBar ({windowWidth}) {
  const { auth } = useAuth()
  const navigate = useNavigate()

  return (
    <Grid container>
      <Grid item xs={7}>
        <a href='/' onClick={(e) =>{e.preventDefault(); navigate('/')}}>
          <img src={logo} alt='Logo' height={75}></img>
        </a>
      </Grid>
      <Grid item xs={4} />
      <Grid item xs={1} sx={{alignSelf: 'center', textAlign: 'right'}}>
        {(((!windowWidth) && (windowWidth !== undefined)) || (window.location.pathname !== '/' && !auth.isAuth)) && ( <NavMenu /> )}
        {
          auth.isAuth &&
            (
              <Stack direction='row'>
                <NavMenu />
                <NavUserMenu />
              </Stack>
            )
        }
      </Grid>
    </Grid>
  )
}