import React, { useEffect, useState } from 'react';
import Footer from '../footer/Footer';
import NavBar from '../navBar/NavBar';
import { Grid, Typography, Box } from '@mui/material';
import useAccountSignUp from '../hooks/useAccountSignUp';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AccountDisplay from './AccountDisplay';
import SignUpAdFiller from './SignUpAdFiller';

export default function AccountSignUp() {
  const { selectedAccount } = useAccountSignUp()
  const { auth } = useAuth()
  const navigate = useNavigate()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (!auth.isAuth) return navigate('/register', { replace : true })
    setIsMounted(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if (!isMounted) return <p>loading...</p>
  return (
    selectedAccount === ''
    ? (
      <Grid container direction='column'>
        <Grid item>
          <NavBar />
        </Grid>

        <Grid item>
          <Box
            sx={{
              background : '#cc171d',
              padding : '2em',
              margin : '2em',
              borderRadius : '50px'
            }}
          >
            <Box sx={{background : 'white', margin : '1em'}}>
              <Typography variant='h3' sx={{textAlign : 'center', padding : '.5em'}}>
                No account has been selected! We offer a verity of accounts. Do any of these interest you?
              </Typography>
            </Box>
          </Box>

          <SignUpAdFiller />
        </Grid>

        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    ) : (
      <Grid container direction='column'>
        <Grid item>
          <NavBar />
        </Grid>

        <Grid item>
          <AccountDisplay account={selectedAccount} />
        </Grid>

        <Grid item>
          <Footer />
        </Grid>
      </Grid>
    )
  )
}