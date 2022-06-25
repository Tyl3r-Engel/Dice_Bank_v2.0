import { Box, Typography } from '@mui/material';
import React from 'react';
import { fakeAccount } from './fakeAccount'
import useSortAccounts from '../../hooks/useSortAccounts';
import Checking from './accounts/Checking';
import Savings from './accounts/Savings';
import useAuth from '../../hooks/useAuth'
export default function AccountList() {
  const { auth } = useAuth()
  const { savingsAccounts, checkingAccounts, loansAccounts, creditCardAccounts, tradeAccounts} = useSortAccounts(fakeAccount)
  return (
    <>
    <Typography variant='h2' sx={{padding : '.3em'}}>Welcome, {auth.userName}</Typography>
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
    </>
  )
}