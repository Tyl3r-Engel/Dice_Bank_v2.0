import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import NavBar from '../navBar/NavBar';
import AccountList from './accountList/AccountList';
import Transactions from './transactions/Transactions';
import Graph from './graph/Graph';
import Footer from '../footer/Footer';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';

export default function DashBoard() {
  const axiosPrivate = useAxiosPrivate()
  const { auth } = useAuth()
  useEffect(() => {
    const getDash = async () => {
      console.log(auth)
      const response = await axiosPrivate.get('/dashBoard')
      console.log(response.data)
    }
    getDash()
  })
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