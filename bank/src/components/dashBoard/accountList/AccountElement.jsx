import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';

export default function CreateAccountElement({ account: { options, status, name, amount} }) {
  const formatBal = () => amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return (
    <Box sx={{background : 'lightgray', borderRadius : '100px'}}>
      <Grid container
        sx={{
          padding : '.5em',
          textAlign : 'center',
          alignItems : 'center'
        }}
      >
        <Grid item xs={4}>
          <Typography sx={{textAlign : 'left', marginLeft : '.5em'}}>
            {name}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          {formatBal()}
        </Grid>
        <Grid item xs={4}>
          <Button>view account</Button>
        </Grid>
      </Grid>
    </Box>
  )
}