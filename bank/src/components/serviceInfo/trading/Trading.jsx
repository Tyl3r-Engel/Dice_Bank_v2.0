import { Grid } from '@mui/material'
import React from 'react'
import Footer from '../../footer/Footer'
import NavBar from '../../navBar/NavBar'

export default function Trading() {
  return(
    <Grid container direction='column'>
      <Grid item xs={12}>
        <NavBar />
      </Grid>
      <Grid item xs={12}>
        <p>this is Trading</p>
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  )
}