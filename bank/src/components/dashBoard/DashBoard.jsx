import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import NavBar from '../navBar/NavBar';
import AccountList from './accountList/AccountList';
import Transactions from './transactions/Transactions';
import Graph from './graph/Graph';
import Footer from '../footer/Footer';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import useDash from '../hooks/useDash';
import { Navigate } from 'react-router-dom';

export default function DashBoard() {
  const [errorFlag, setErrorFlag] = useState(false)
  const { isMounted, setIsMounted } = useDash()
  const { auth, setAuth } = useAuth()
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    const getDash = async () => {
      try {
        const response = await axiosPrivate.get('/dashBoard')
        console.log(response)
        if (response?.response?.status === 403) throw new Error('unauthorized')
        else setIsMounted(true)

        const { data } = response
        console.log(data)

      } catch(e) {
        console.log('ERROR:::', e)
        setAuth({})
        setErrorFlag(true)
      }
    }
    getDash()
  })
  if (errorFlag) return <Navigate to='/' />
  if (!isMounted) return <p>Loading Dash Board...</p>
  return(
    <Grid container direction='column'>
      <Grid item xs={12} >
        <NavBar />
      </Grid>

      <Grid item xs={12} sx={{padding : '2em'}}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <AccountList />
          </Grid>
          <Grid item xs={6}>
            <Grid container direction='column'>
              <Grid item xs={12}>
                <Transactions />
              </Grid>
              <Grid item xs={12} >
                <Graph />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  )
}