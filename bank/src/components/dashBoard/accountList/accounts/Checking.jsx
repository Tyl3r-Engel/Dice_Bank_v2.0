import React from 'react';
import { Box, Typography } from '@mui/material'
import AccountElement from '../AccountElement';
export default function Checking({checkingAccounts: checking}) {
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
        Checking Accounts:
      </Typography>
      {
        checking.map((account, index) => (
          <Box sx={{padding : '.5em'}} key={`${index} cam`}>
            <AccountElement account={account} />
          </Box>
        ))
      }
    </Box>
  )
}