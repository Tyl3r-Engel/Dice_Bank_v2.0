import { Box, Typography } from '@mui/material';
import React from 'react';
import Checking from './accounts/Checking';
import Savings from './accounts/Savings';
import useAuth from '../../hooks/useAuth'
import useDash from '../../hooks/useDash';

export default function AccountList() {
  const { auth } = useAuth()
  const { accounts } = useDash()
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
        <Box sx={{background : '#FAF9F6', padding : '1em'}} >
          {accounts.checking &&( <Checking checkingAccounts={accounts.checking}/> )}
          {accounts.savings && ( <Savings savingsAccounts={accounts.savings}/> )}
        </Box>
      </Box>
    </>
  )
}