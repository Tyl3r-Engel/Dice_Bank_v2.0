import React from 'react';
import { Box, Typography } from '@mui/material'
import AccountElement from '../AccountElement';
export default function Savings({savingsAccounts: savings}) {
  return(
    <Box>
      <Typography
        sx={{
          textAlign : 'center',
          color : 'black',
          textDecoration : 'underline'
        }}
        variant='h5'
      >
        Savings Accounts:
      </Typography>
      {
        savings.map((account, index) => (
          <Box sx={{padding : '.5em'}} key={`${index} cam`}>
            <AccountElement account={account} />
          </Box>
        ))
      }
    </Box>
  )
}