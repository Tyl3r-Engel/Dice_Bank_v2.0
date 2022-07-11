import React from 'react';
import { Box, Button, Grid } from '@mui/material';
import advertBackground from './images/advertBackground.png'
import goldCard from './images/goldCard.png'
import deal from './images/deal.png'
import stocks from './images/stocks.png'
import GetMainAd from './mainAd'
import { useNavigate } from 'react-router-dom';

export default function Advert () {
  const navigate = useNavigate()
  const subCardInfo = [
    {
      name : 'goldCard',
      imgSrc : goldCard,
      description : 'Gold Rewards',
      onClick : function() { return navigate('/creditCard')}
    },
    {
      name : 'deal',
      imgSrc : deal,
      description : '4U Loans',
      onClick : function() { return navigate('/loan')}
    },
    {
      name : 'stocks',
      imgSrc : stocks,
      description : 'Stocks (WIP)',
      onClick : function() { return navigate('/trading')}
    }
  ]

  return (
    <Box sx={{
      backgroundImage : `url(${advertBackground})`,
      backgroundSize: 'cover',
      overflow: 'hidden',
      width : '100%',
      height : '100%'
    }}>
      <Grid container>
        {
          GetMainAd()
        }
        {
          subCardInfo.map((element, index) => (
            <Grid key={`${index} aom`} item xs={0} md={4} sx={{padding : '1em', textAlign : 'center'}} >
                <Box sx={{
                  background : '#325765',
                  padding : '1em',
                  borderRadius : '12px'
                }}>
                  <img src={element.imgSrc} alt={element.name} style={{height : '100%', width : '100%'}}/>
                  <Button
                    variant='outlined'
                    color='inherit'
                    sx={{color : 'white', padding : '.5em'}}
                    onClick={element.onClick}
                  >
                    {element.description}
                  </Button>
              </Box>
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )
}
