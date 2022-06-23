import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import AuthContext from '../../context/AuthProvider';
import NavBar from '../navBar/NavBar';
import AccountList from './accountList/AccountList';
import Transactions from './transactions/Transactions';
import Graph from './graph/Graph';
import Footer from '../footer/Footer';

export default function DashBoard() {
  const { auth } = useContext(AuthContext)
  if(!auth?.isAuth) return <Navigate to='/' />
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