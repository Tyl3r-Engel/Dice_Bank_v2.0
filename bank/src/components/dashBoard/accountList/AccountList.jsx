import { Box, Typography } from '@mui/material';
import React from 'react';
import { fakeAccount } from './fakeAccount'
import useSortAccounts from '../../hooks/useSortAccounts';
import Checking from './accounts/Checking';
import Savings from './accounts/Savings';

export default function AccountList() {
  const { savingsAccounts, checkingAccounts, loansAccounts, creditCardAccounts, tradeAccounts} = useSortAccounts(fakeAccount)
  return (
    <Box sx={{background : '#325765', padding : '2em'}}>
      <Typography
        sx={{
          textAlign : 'center',
          color : 'white',
          padding : '1em'
        }}
        variant='h3'
      >
        Accounts
      </Typography>
      <Checking checkingAccounts={checkingAccounts} />
      <Savings savingsAccounts={savingsAccounts} />
    </Box>
  )
}