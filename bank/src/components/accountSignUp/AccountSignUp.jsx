import React, { useEffect, useState } from 'react';
import Footer from '../footer/Footer';
import NavBar from '../navBar/NavBar';
import { Grid, Typography, Box } from '@mui/material';
import useAccountSignUp from '../hooks/useAccountSignUp';
import { CheckingAndSavingsInfo as cas } from '../serviceInfo/checkingAndSavings/CheckingAndSavingsInfo';
import { CreditCardInfo as cc } from '../serviceInfo/creditCard/CreditCardInfo';
import ServiceElement from '../serviceInfo/ServiceElement';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AccountDisplay from './AccountDisplay';

export default function AccountSignUp() {
  const { selectedAccount } = useAccountSignUp()
  const { auth } = useAuth()
  const navigate = useNavigate()
  const [isMounted, setIsMounted] = useState(false)
  const [account1, setAccount1] = useState({})
  const [account2, setAccount2] = useState({})
  const [account3, setAccount3] = useState({})

  useEffect(() => {
    if (!auth.isAuth) navigate('/register', { replace : true })
    setAccount1(Math.floor(Math.random()*cas.length))
    setAccount2(Math.floor(Math.random()*cc.length))
    setAccount3(Math.floor(Math.random()*cc.length))
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
          {
            [
              cas[account1],
              cc[account2],
              cc[account3]
            ].map((element, index) => <ServiceElement key={`${index} asuam`} element={element}/>)
          }
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