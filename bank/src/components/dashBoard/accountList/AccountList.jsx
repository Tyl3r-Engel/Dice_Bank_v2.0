import { Box, Typography } from '@mui/material';
import React from 'react';
import Checking from './accounts/Checking';
import Savings from './accounts/Savings';
import useAuth from '../../hooks/useAuth'
import useDash from '../../hooks/useDash';
import CreditCard from './accounts/CreditCard';
import Loan from './accounts/Loan';
import Trading from './accounts/Trading';

export default function AccountList() {
  const { auth } = useAuth()
  const { accounts } = useDash()
  return (
    <>
      <Typography variant='h2' sx={{padding : '.3em'}}>Welcome, {auth.userName}</Typography>
      <Box sx={{background : '#325765', padding : '2em', borderRadius : '50px'}}>
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
        <Box sx={{background : '#FAF9F6', padding : '1em', borderRadius : '25px'}} >
          {accounts.trading &&( <Trading tradingAccounts={accounts.trading}/> )}
          {accounts.checking &&( <Checking checkingAccounts={accounts.checking}/> )}
          {accounts.savings && ( <Savings savingsAccounts={accounts.savings}/> )}
          {accounts.creditCard && ( <CreditCard creditCardAccounts={accounts.creditCard}/> )}
          {accounts.loan && ( <Loan loanAccounts={accounts.loan}/> )}
        </Box>
      </Box>
    </>
  )
}