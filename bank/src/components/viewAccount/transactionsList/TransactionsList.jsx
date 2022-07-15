import React from 'react';
import { Box, Typography } from '@mui/material';
import TransactionListElement from './TransactionListElement';

export default function TransactionsList({ transactions, type }) {
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
                transactions.map((element, index) => <TransactionListElement element={element} key={`${index} tlm`} index={`${index} tlm lem`} type={type} /> )
              }
            </Box>
          </Box>
        )
       }
    </>
  )
}