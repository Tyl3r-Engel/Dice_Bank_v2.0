import React, { useState } from 'react';
import { Grid, Box, Typography } from '@mui/material';

export default function TransactionListElement({ element, index, type }) {
  const formatBal = (amount) => `$${String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  const [isCredit] = useState(type === 'creditCard' || type === 'loan')
  const formateDate = element.date.slice(0, element.date.length - 5).split('T')[0].replaceAll('-','/')
  return (
    <Box
      key={index}
      sx={{
        background : `${ element.waswithdrawl ? 'red' :'lime' }`,
        padding : '.2em',
        margin : '1em',
        borderRadius : '25px'
      }}
    >
      <Box
        sx={{
          background : 'white',
          borderRadius : '25px',
          padding : '1em'
        }}
      >
        <Grid container sx={{alignItems : 'center'}}>

          <Grid item xs={3}>
            <Typography variant='h6'>
              {element.waswithdrawl ? '❌ ' : '✅'  }
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography variant='h6'>
              {
                (
                  ( (element.waswithdrawl && !isCredit) && `-${formatBal(element.amount)}` )
                  || ( (!element.waswithdrawl && isCredit) && `-${formatBal(element.amount)}` )
                  || `+${formatBal(element.amount)}`
                )
              }
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography variant='h6' sx={{textAlign : 'center'}}>
              {element.fromname}
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography variant='h6' sx={{textAlign : 'center'}}>
              {formateDate}
            </Typography>
          </Grid>

        </Grid>
      </Box>
    </Box>
  )
}