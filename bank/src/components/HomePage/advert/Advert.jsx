import React from 'react';
import { Box, Button, Grid, Paper } from '@mui/material';
import advertBackground from './advertBackground.png'
import goldCard from './goldCard.png'
import deal from './deal.png'
import stocks from './stocks.png'

export default function Advert () {
  return (
    <Box sx={{
      backgroundImage : `url(${advertBackground})`,
      backgroundSize: 'cover',
      overflow: 'hidden',
      width : '100%',
      height : '100%'
    }}>
      <Grid container sx={{width : '100%', height : '100%'}}>
        <Grid item xs={8}>

        </Grid>
        <Grid item xs={0}  md={4} sx={{padding : '1em'}} >
          <Paper>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elit risus, mollis et tortor non, porttitor ultricies libero. Aenean at justo et mi suscipit porttitor ac eget nisi. Aenean urna est, dignissim sit amet mi non</Paper>
        </Grid>

        {
          [
            {name : 'goldCard', imgSrc : goldCard, description : 'Gold Rewards'},
            {name : 'deal', imgSrc : deal, description : '4U Loans'},
            {name : 'stocks', imgSrc : stocks, description : 'Stocks (WIP)'},
          ].map((element, index) => (
            <Grid key={`${index} aom`} item xs={0} md={4} sx={{padding : '1em', textAlign : 'center'}} >
                <Box sx={{
                  background : '#325765',
                  padding : '1em',
                  borderRadius : '12px'
                }}>
                  <img src={element.imgSrc} alt={element.name} style={{height : '100%', width : '100%'}}/>
                  <Button variant='outlined' color='inherit' sx={{color : 'white', padding : '.5em'}} >{element.description}</Button>
                </Box>
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )
}
