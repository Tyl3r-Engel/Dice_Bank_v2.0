import React from 'react'
import { Box, Typography } from '@mui/material'
import AccountElement from '../AccountElement';

export default function Trading({tradingAccounts: trading}) {
  const getTradingList = () => (
    trading.map((account, index) => (
      <Box sx={{ margin : '1.5em'}} key={`${index} cam`}>
        <AccountElement account={account} />
      </Box>
    ))
  )

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
        Trading Accounts:
      </Typography>

      {
        trading.length > 3
          ? (
            <Box sx={{ height : '300px', width : '100%', overflow : 'scroll'}}>
              {getTradingList()}
            </Box>
          ) : (
            getTradingList()
          )
      }
    </Box>
  )
}