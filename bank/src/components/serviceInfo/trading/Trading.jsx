import { Box, Grid, Typography, Paper } from '@mui/material'
import React from 'react'
import Footer from '../../footer/Footer'
import NavBar from '../../navBar/NavBar'
import ServiceElement from '../ServiceElement'
import tempImg from './tempImg.png'
import tradingImg from '../../HomePage/advert/images/stocks.png'

export default function Trading() {

  if (1 === 2 - 1 ) return(
    <Grid container direction='column'>
      <Grid item xs={12}>
        <NavBar />
      </Grid>
      <Grid item xs={12} sx={{ alignSelf : 'center', margin : '5em'}}>
        <img src={tempImg} alt='' />
      </Grid>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  )

  return(
    <Grid container direction='column'>
      <Grid item xs={12}>
        <NavBar />
      </Grid>

      <Grid item xs={12}>
        <Grid container direction='colum' sx={{ justifyContent : 'center'}}>

          <Grid item>
            <Box sx={{ background : 'lightgray', width : '1000px', height : '500px'}}>
            </Box>
          </Grid>

          <Grid item>
            <Box sx={{ background : '#325765', padding : '1em', margin : '1em', borderRadius : '25px'}}>
              <Paper elevation={24} sx={{margin : '1em'}}>
                <Typography variant='h5' sx={{padding : '1.5em'}}>
                  This is where you can sign up to be part of our stock trading club. With a trading account you will be able to go to <a href='_'>TEMP NAME</a> where once you create an account you will be able to link your Dice Bank Trading account to TEMP NAME. Once your account has been linked you can use the money in it or transfer more to go buy stocks on TEMP NAME
                </Typography>
              </Paper>
            </Box>
          </Grid>
          <Grid item>
          <ServiceElement element={{
                name : 'Trading Account',
                dis : 'A trading account is almost like a checking account, except you use a trading a account for buying and selling stocks on TEMP NAME where you can then transfer the money you make or lose to and from your other accounts. Promo deal get 25% back initial deposit',
                image : tradingImg,
                options : {
                  'type' : 'trading',
                  'interestRate' : .05,
                  'promo' : '25% init deposit'
                }
              }} size={2}/>
          </Grid>

        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  )
}