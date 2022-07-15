import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import NavBar from '../navBar/NavBar';
import AccountList from './accountList/AccountList';
import DashTransactions from './transactions/DashTransactions';
import Footer from '../footer/Footer';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import useDash from '../hooks/useDash';
import { Navigate } from 'react-router-dom';
import AccountAdFiller from '../accountAdFiller/AccountAdFiller';

export default function DashBoard() {
  const [errorFlag, setErrorFlag] = useState(false)
  const { isMounted, setIsMounted, setAccounts, accounts } = useDash()
  const { setAuth } = useAuth()
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    const getDash = async () => {
      try {
        const response = await axiosPrivate.get('/dashBoard')
        if (response?.response?.status === 403 || response?.response?.status === 401) throw new Error('unauthorized')
        setAccounts(response.data)
        setIsMounted(true)
      } catch(e) {
        console.log('ERROR:::', e)
        setAuth({})
        setErrorFlag(true)
      }
    }
    getDash()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if (errorFlag) return <Navigate to='/' />
  if (!isMounted) return <p>Loading Dash Board...</p>
  return(
    <Grid container direction='column'>
      <Grid item xs={12} >
        <NavBar />
      </Grid>

      <Grid item xs={12} sx={{padding : '2em'}}>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            {
              Object.keys(accounts).length !== 0 ? ( <AccountList /> ) : (
                <Box sx={{background : '#325765', padding : '2em'}}>
                  <Box sx={{background : '#FAF9F6', padding : '1em'}} >
                    <Typography variant='h3' sx={{ textAlign : 'center', margin : '1em'}}>
                      Looks like you don't have any accounts. Lets change that! Do any of these accounts interest you?
                    </Typography>
                    <AccountAdFiller size={2}/>
                  </Box>
                </Box>
              )
            }
          </Grid>

          <Grid item xs={5}>
            {
              Object.keys(accounts).length !== 0 && (
                <>
                  <Typography variant='h3' sx={{ textAlign : 'center', padding : '.5em'}}>
                    Recent Transactions:
                  </Typography>
                  <DashTransactions />
                </>
              )
            }
          </Grid>
        </Grid>


        <Grid item xs={12}>
          <Typography variant='h3' sx={{ textAlign : 'center', padding : '.5em'}}>
            Other Accounts:
          </Typography>
          <AccountAdFiller size={3} />
        </Grid>

      </Grid>

      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  )
}