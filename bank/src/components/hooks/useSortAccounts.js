import { useState, useEffect } from 'react';

export default function useSortAccounts(listOfAccounts) {
  const [savingsAccounts, setSavingsAccounts] = useState([])
  const [checkingAccounts, setCheckingAccounts] = useState([])
  const [loansAccounts, setLoansAccounts] = useState([])
  const [creditCardAccounts, setCreditCardAccounts] = useState([])
  const [tradeAccounts, setTradeAccounts] = useState([])
  useEffect(() => {
    listOfAccounts.forEach(account => {
      switch (account.accountType) {
        case 'savings':
          setSavingsAccounts(prev => [...prev, account])
          break;

        case 'checking':
          setCheckingAccounts(prev => [...prev, account])
          break;

        case 'loan':

          break;

        case 'creditCard':

          break;

        case 'trade':

          break;

        default:
          break;
      }
    })

    return () => {
      setSavingsAccounts([])
      setCheckingAccounts([])
      setLoansAccounts([])
      setCreditCardAccounts([])
      setTradeAccounts([])
    }
  },[
    listOfAccounts,
    setSavingsAccounts,
    setCheckingAccounts,
    setLoansAccounts,
    setCreditCardAccounts,
    setTradeAccounts
  ])
  return { savingsAccounts, checkingAccounts, loansAccounts, creditCardAccounts, tradeAccounts}
}