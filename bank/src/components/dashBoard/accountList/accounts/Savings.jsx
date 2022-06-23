import React from 'react';
import { Box, Divider, Typography } from '@mui/material'
import AccountElement from '../AccountElement';
export default function Savings({savingsAccounts: savings}) {
  return(
      savings.length > 0 && (
        <Box sx={{background : 'white'}} >
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
              <React.Fragment key={`${index} cam`}>
                <AccountElement account={account} />
                <Divider />
              </React.Fragment >
            ))
          }
        </Box>
      )
  )
}