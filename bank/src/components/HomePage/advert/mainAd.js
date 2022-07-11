import React, { useState, useEffect } from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import moneyBagImage from './images/moneyBagImage.png';
import creditCardAd from './images/creditCardAd.png';
import loanAd from './images/loanAd.png';

export default function GetMainAd() {
  const [randomAd, setRandomAd] = useState(-1)
  const navigate = useNavigate()
  const mainAds = [
    {
      'name': 'SavingsAd',
      'description' : 'Sign up with us for a savings account that works for you',
      'imgSrc' : moneyBagImage,
      'ButtonText' : 'Start saving',
      'onClick' : function () {
        navigate('/checkingAndSavings')
      }
    },
    {
      'name': 'CreditCardAd',
      'description' : 'Sign up for one of our newest Credit Cards',
      'imgSrc' : creditCardAd,
      'ButtonText' : 'Sign up now',
      'onClick' : function () {
        navigate('/creditCard')
      }
    },
    {
      'name': 'LoanAd',
      'description' : 'Take out a personal loan to keep you rolling',
      'imgSrc' : loanAd,
      'ButtonText' : 'Get loan',
      'onClick' : function () {
        navigate('loan')
      }
    },
  ]

  useEffect(() => {
    setRandomAd(Math.floor(Math.random() * 3))
  },[setRandomAd])

  return (
    <>
    {
      (randomAd !== -1) && (
        <>
          <Grid item xs={12} lg={4} sx={{textAlign : 'center'}}>
            <img src={mainAds[randomAd].imgSrc} alt='moneybag' />
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={0}  lg={7} sx={{padding : '1em', alignSelf : 'center'}} >
            <Paper sx={{
              textAlign : 'center',
              padding : '1em',
              marginLeft : '1em',
              backgroundColor : '#325765',
              borderRadius : '25px'
            }}>
              <Typography variant='h5' sx={{color : 'white', padding : '1em'}}>
                {mainAds[randomAd].description}
              </Typography>
              <Button
                variant='outlined'
                color='inherit'
                sx={{
                  color : 'white',
                  padding : '.5em'
                }}
                onClick={mainAds[randomAd].onClick}
              >
                {mainAds[randomAd].ButtonText}
              </Button>
            </Paper>
          </Grid>
        </>
      )
    }
    </>
  )
}