import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useDash from '../../hooks/useDash';
import TransactionListElement from '../../viewAccount/transactionsList/TransactionListElement';

export default function Transactions() {
  const { accounts } = useDash()
  const axios = useAxiosPrivate()
  const [isMounted, setIsMounted] = useState(false)
  const [transactionsList, setTransactionsList] = useState([])

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
        <p>Loading...</p>
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
          transactionsList.map((transaction, index) => {
            let type;
            for (let key in accounts) {
              const result = accounts[key].find(element => element.accountnumber === Number(transaction.accountnumber))
              if (result?.type) {type = result.type; break}
            }

            if(!type) throw new Error('no type')
            return <TransactionListElement element={transaction} key={`${index} dtm`} index={`${index} dtm tle`}  type={type} />
          })
        }
        </Box>
      </Box>
    )
  )
}