import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Loading from '../../../loading/Loading';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useDash from '../../hooks/useDash';
import TransactionListElement from '../../viewAccount/transactionsList/TransactionListElement';

export default function Transactions() {
  const { accounts } = useDash()
  const axios = useAxiosPrivate()
  const [isMounted, setIsMounted] = useState(false)
  const [transactionsList, setTransactionsList] = useState([])

  const sortAccounts = () => transactionsList.map((transaction, index) => {
    let account;

    for (let key in accounts) {
      const result = accounts[key].find(element => element.accountnumber === Number(transaction.accountnumber))
      if (result?.type) {account = result; break}
    }

    if(!account?.type) throw new Error('no type')
    return (
      <Box key={`${index} dtm`}>
        <Typography
        sx={{
          textIndent : '2em',
          textDecorationColor : 'lightgray',
          fontSize : 'small'
        }}
        >
          <em>in {account.name} ⬇️</em>
        </Typography>
        <TransactionListElement element={transaction} index={`${index} dtm tle`} type={account.type} />
      </Box>
    )
  }).reverse()


  useEffect(() => {
    const tempList = []
    for(let key in accounts) tempList.push(...accounts[key].map(element => element.accountnumber))

    const getRecentTransActions = async () => {
      try {
        const response = await axios.get(`/recentTransactions/${tempList.join('%20')}`)
        if (response?.response) throw new Error()
        setTransactionsList(response.data)
        setTimeout(() => setIsMounted(true), 800)
      } catch {
        setIsMounted(false)
      }
    }
    getRecentTransActions()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    !isMounted ? (
      <Box
        sx={{
          background : '#325765',
          padding : '1em',
          borderRadius : '50px'
        }}
      >
        <Loading />
      </Box>
    ) : (
      <Box
        sx={{
          background : '#325765',
          padding : '1em',
          borderRadius : '50px'
        }}
      >
        <Box sx={{ background : 'white', padding : '.5em', borderRadius : '25px', margin : '.5em'}}>
        {
          transactionsList.length > 0 ? (
            sortAccounts()
          ) : (
            <Typography variant='body1' sx={{ textAlign : 'center', padding : '1em'}}>
              <em>You Don't have any transactions</em>
            </Typography>
          )
        }
        </Box>
      </Box>
    )
  )
}