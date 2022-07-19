import { Box, Divider, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

export default function SpendingGraph({ transactions, type }) {
  const greenHelperText = `${type === 'creditCard' || type === 'loan' ? 'Payments' :'Deposits'}`
  const [deposits, setDeposits] = useState(0)
  const [withdrawals, setWithdrawals] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (transactions.length > 0) {
      let tempDeposit = 0
      let tempWithdrawal = 0
      transactions.forEach(transaction => {
        if(transaction.waswithdrawl) tempWithdrawal += 1
        else tempDeposit += 1
      })
      setDeposits(tempDeposit)
      setWithdrawals(tempWithdrawal)
      setIsMounted(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if (!isMounted) return <></>
  return (
    <Box sx={{ background : '#325765', borderRadius : '50px', padding : '1em', height : '100%'}}>
      <Box sx={{ background : 'white', margin : '1em', padding : '1em', borderRadius : '50px' }}>

        <Typography sx={{ textAlign : 'center' }} variant='h5'>
          Spending Habits
        </Typography>

        <Divider />

        <br/>

        <Box sx={{ background : 'black', borderRadius : '100%', border : '1px solid black', padding : '.2em' }}>
          <PieChart
            data={[
              { title: greenHelperText,  value: deposits, color: 'lime' },
              { title: 'Withdrawals', value: withdrawals, color: 'red' },
            ]}
            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
            labelPosition={50}
            labelStyle={{ fontSize : 'xx-small'}}
          />
        </Box>
      </Box>
    </Box>
  )
}