import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

export default function TransactionsList({ transactions, type }) {
  const formatBal = (amount) => `$${String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  const formatDate = (rawDate) => rawDate.slice(0, rawDate.length - 5).split('T')[0].replaceAll('-','/')
  return (
    <>
      <Typography variant='h2' sx={{marginBottom : '.1em'}}>
        Transactions:
      </Typography>
      {
        transactions.length === 0 ? (
          <Box
            sx={{
              background : '#325765',
              padding : '1em',
              borderRadius : '50px'
            }}
          >
            <Box
              sx={{
                background : 'white',
                margin : '1em',
                borderRadius : '25px'
              }}
            >
              <Typography variant='h4' sx={{textAlign : 'center', padding : '1em'}}>
                There are no transactions available for this account
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              background : '#325765',
              padding : '1em',
              borderRadius : '50px',
            }}
          >
            <Box
              sx={{
                height : `${ transactions.length > 8 ? '740px' : '100%' }`,
                overflowY : `${ transactions.length > 8 ? 'scroll' : 'hidden' }`,
                margin : '.5em'
              }}
            >
              {
                transactions.map((element, index) => {
                  const isCredit = type === 'creditCard' || type === 'loan'
                  const formateDate = formatDate(element.date)
                  return (
                    <Box
                      key={`${index} tlm`}
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
                })
              }
            </Box>
          </Box>
        )
       }
    </>
  )
}