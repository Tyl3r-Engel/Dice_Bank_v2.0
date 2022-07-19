import React, { useState, useEffect } from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';

import moneyBagImage from './images/moneyBagImage.png';
import creditCardAd from './images/creditCardAd.png';
import loanAd from './images/loanAd.png';
import Loading from '../../../loading/Loading';

export default function GetMainAd() {
  const [randomAd] = useState(Math.floor(Math.random() * 3))
  const navigate = useNavigate()
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {setTimeout(() => setIsMounted(true), 1000)},[])
  const { windowSize } = useUser()
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
  if(!isMounted) return <Loading />
  return (
    <>
    {
      (randomAd !== -1) && (
        <>
          <Grid item xs={12} lg={4} sx={{textAlign : 'center'}}>
            <img src={mainAds[randomAd].imgSrc} alt='moneybag' style={{ width : '100%', maxWidth : '300px', height : '100%', maxHeight : '300px'}}/>
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
              <Typography variant={windowSize.width < 600 ? 'body1' : 'h5'} sx={{color : 'white', padding : '1em'}}>
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