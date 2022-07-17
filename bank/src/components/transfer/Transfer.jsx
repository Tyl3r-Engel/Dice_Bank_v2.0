import { Grid, Paper, Select, MenuItem, FormHelperText, TextField, Typography, Divider, Button, Snackbar, Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Navbar from '../navBar/NavBar';
import Footer from '../footer/Footer'
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Box } from '@mui/system';
import transactionImg from './transactionImg.png'
import Loading from '../../loading/Loading';

export default function Transfer() {
  const location = useLocation()
  const navigate = useNavigate()
  const axios = useAxiosPrivate()
  const [redirectAccountName] = useState(location?.state?.name)

  const [fromAccount, setFromAccount] = useState({})
  const [fromAccountAmount, setFromAccountAmount] = useState('')
  const handleFromAccountChange = (e) => setFromAccount(e.target.value)

  const [createPayment] = useState({ isPayment : true })
  const [toAccount, setToAccount] = useState({})
  const handleToAccountChange = (e) => setToAccount(e.target.value)

  const [accountList, setAccountList] = useState([])
  const [isMounted, setIsMounted] = useState(false)
  const [toOtherAccount, setToOtherAccount] = useState({ accountnumber : '', accountsecret : ''})
  const [error, setError] = useState({ status : false , message : ''})
  const handleErrorClose = () => setError({ state : false, message : ''})
  const handleTransfer = async () => {
    try {
      if (
        ( Object.keys(toAccount).length === 0 || Object.keys(toAccount).length === 4 ) &&
        (( toOtherAccount.accountnumber === '' || toOtherAccount.accountnumber === 0 ) && toOtherAccount.accountsecret === '')
      ) throw new Error('A account to transfer to must be selected')
      else if (
        Object.keys(fromAccount).length === 0 || Object.keys(fromAccount).length === 4
      ) throw new Error('A account to transfer from must be selected')
      else if (
        fromAccountAmount < 1 || fromAccountAmount === ''
      ) throw new Error('A amount must be specified')
      else if (
        (
          ( Object.keys(toAccount).length !== 0 || Object.keys(toAccount).length !== 4 ) &&
          ( ( toOtherAccount.accountnumber === '' || toOtherAccount.accountnumber === 0 ) && toOtherAccount.accountsecret === '' )
        ) || (
          ( Object.keys(toAccount).length === 0 || Object.keys(toAccount).length === 4 ) &&
          ( ( toOtherAccount.accountnumber !== '' || toOtherAccount.accountnumber !== 0 ) && toOtherAccount.accountsecret !== '' )
        )
      ) {
        console.log((Object.keys(toAccount).length !== 0 || Object.keys(toAccount).length !== 4) , (toOtherAccount.accountnumber === '' || toOtherAccount.accountnumber === 0 ) && toOtherAccount.accountsecret === '', toOtherAccount)
         const data = {
          to : ((Object.keys(toAccount).length !== 0 || Object.keys(toAccount).length !== 4) && (toOtherAccount.accountnumber === '' || toOtherAccount.accountnumber === 0 ) && toOtherAccount.accountsecret === '' ) ? toAccount : toOtherAccount,
          from : fromAccount,
          amount : fromAccountAmount,
        }
        const response = await axios.post('/transfer', data)

        console.log(response)
        if (response?.status === 200) {
          setIsMounted(false)
          setToAccount({})
          setToOtherAccount({ accountnumber : '', accountsecret : ''})
          setFromAccountAmount('')

          if (toAccount.isPayment && fromAccount.type === 'loan') {
            fromAccount.options.paymentAmount -= fromAccountAmount
          } else {
            fromAccount.balance = String(fromAccount.balance -= toAccount.isPayment ? (0 - fromAccountAmount) : fromAccountAmount).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          setTimeout(() => navigate('/viewAccount', { replace : true,  state : { ...fromAccount } }), 2000)
        } else throw new Error(response.response.data)
      } else throw new Error('Can not have 2 accounts to transfer to selected or forgot to fill out a field')
    } catch(e) {
      setError({ status : true, message : e.message})
    }
  }

  useEffect(() => {
    const getAccounts = async () => {
      try {
        const response = await axios.get('/dashBoard')
        if (response?.response?.status === 403 || response?.response?.status === 401) throw new Error('unauthorized')

        const tempAccountList = []
        for (let key in response.data) response.data[key].forEach(element => tempAccountList.push(element))

        let flag = false
        if(redirectAccountName) {
          setFromAccount(tempAccountList.find(element => element.name === redirectAccountName))
          flag = true
        }

        !flag && setFromAccount(tempAccountList[0])
        setAccountList(tempAccountList)
        setIsMounted(true)
      } catch(e) {
        setError({ status : true, message : e.message})
        setTimeout(() => navigate('/', { replace : true }), 3000)
      }
    }
    getAccounts()
    return () => {
      setIsMounted(false)
      setToAccount({})
      setToOtherAccount({ accountnumber : '', accountsecret : ''})
      setFromAccountAmount('')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if(!isMounted) return (
    <>
      <Loading />
      <Snackbar
        open={error.status}
        autoHideDuration={5000}
        onClose={handleErrorClose}
      >
        <Alert severity='warning' sx={{ width: '100%' }} onClose={handleErrorClose}>
          {error.message}
        </Alert>
      </Snackbar>
    </>
  )
  return (
    <Grid container direction='column'>
      <Grid item xs={12}>
        <Navbar />
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={24} sx={{ padding : '3em', margin : '3em'}}>
          <Grid container spacing={5} sx={{alignItems : 'center'}}>
            <Grid item xs={1} />
            <Grid item xs={4}>
              <Paper elevation={24} sx={{ borderRadius : '50px'}}>
                <Box
                  sx={{
                    background : '#325765',
                    padding : '1em',
                    borderRadius : '50px'
                  }}
                >
                  <Box
                    sx={{
                      background : 'white',
                      margin : '2em',
                      padding : '1em',
                      borderRadius : '25px'
                    }}
                  >
                    <Box sx={{padding : '1em', textAlignLast : 'center'}}>
                      <Select
                        defaultValue=''
                        value={Object.keys(fromAccount).length > 0 ? fromAccount : ''}
                        onChange={handleFromAccountChange}
                      >
                        {
                          accountList.map((element, index) => element.name !== toAccount.name
                          ? <MenuItem key={`${index} altm`} value={element}>{element.name}</MenuItem>
                          : <MenuItem disabled key={`${index} altm`} value={element}>{element.name}</MenuItem>)
                        }
                      </Select>
                      <FormHelperText>Your account to transfer from</FormHelperText>
                      <TextField
                          autoComplete='off'
                          type='number'
                          value={fromAccountAmount}
                          onChange={(e) => !(String(e.target.value).match(/[1-9]/g) === null) && setFromAccountAmount(e.target.value)}
                        />
                        <FormHelperText>amount</FormHelperText>
                    </Box>
                  </Box>
                </Box>

              </Paper>
            </Grid>

            <Grid item xs={2} sx={{ textAlign : 'center'}}>
              <img style={{width : '100%'}} src={transactionImg} alt='transactionImg' />
              <Button onClick={handleTransfer}>
                Make transfer
              </Button>

              <Snackbar
                open={error.status}
                autoHideDuration={5000}
                onClose={handleErrorClose}
              >
                <Alert severity='warning' sx={{ width: '100%' }} onClose={handleErrorClose}>
                  {error.message}
                </Alert>
              </Snackbar>
            </Grid>

            <Grid item xs={4}>
              <Paper elevation={24} sx={{ borderRadius : '50px'}}>
                <Box
                  sx={{
                    background : '#325765',
                    padding : '1em',
                    borderRadius : '50px'
                  }}
                >
                  <Box
                    sx={{
                      background : 'white',
                      margin : '2em',
                      padding : '1em',
                      borderRadius : '25px'
                    }}
                  >
                    <Box sx={{padding : '1em', textAlignLast : 'center'}}>
                      <Select
                        defaultValue='none'
                        onChange={handleToAccountChange}
                      >
                        <MenuItem value='none'>
                          <em>None</em>
                        </MenuItem>
                        {
                          ((fromAccount.type === 'loan' && fromAccount.options.paymentAmount !== 0) || fromAccount.type === 'creditCard') && (
                            <MenuItem value={createPayment}>
                              <em>Make Payment</em>
                            </MenuItem>
                          )
                        }
                        {
                          accountList.map((element, index) => element.name !== fromAccount.name
                          ? <MenuItem key={`${index} altm`} value={element}>{element.name}</MenuItem>
                          : <MenuItem disabled key={`${index} altm`} value={element}>{element.name}</MenuItem>)
                        }
                      </Select>
                      <FormHelperText>Your account to transfer to</FormHelperText>
                      {
                        ((fromAccount.type === 'loan' || fromAccount.type === 'creditCard') && toAccount?.isPayment) && (
                          <>
                            <Select
                              defaultValue='pick account'
                              onChange={(e) => {
                                setToAccount(
                                  prev => ({
                                    ...e.target.value,
                                    ...prev
                                  })
                                )
                              }}
                            >
                              <MenuItem disabled value='pick account'>
                                <em>Pick An Account</em>
                              </MenuItem>
                              {
                                accountList.map((element, index) => element.name !== fromAccount.name
                                ? <MenuItem key={`${index} altm`} value={element}>{element.name}</MenuItem>
                                : <MenuItem disabled key={`${index} altm`} value={element}>{element.name}</MenuItem>)
                              }
                            </Select>
                            <FormHelperText>Your account to transfer payment from</FormHelperText>
                          </>
                        )
                      }
                    </Box>

                    <Divider />
                    <br />

                    <Box
                      sx={{
                        background : '#cc171d',
                        borderRadius : '24px',
                        textAlignLast : 'center',
                        padding : '1em'
                      }}
                    >
                      <Box sx={{ background : 'white', borderRadius : '24px', padding : '1em'}}>
                        <Typography>
                          Send to another user:
                        </Typography>
                        <TextField
                          autoComplete='off'
                          type='number'
                          value={toOtherAccount.accountnumber}
                          onChange={(e) => (
                            String(e.target.value).split('').length <= 10 &&
                              setToOtherAccount(prev => ({ ...prev, accountnumber : Math.abs(e.target.value) }))
                          )}
                        />
                        <FormHelperText>account number</FormHelperText>
                        <TextField
                          type='text'
                          autoComplete='off'
                          value={toOtherAccount.accountsecret}
                          onChange={(e) => setToOtherAccount(prev => ({ ...prev, accountsecret : e.target.value}))}
                        />
                        <FormHelperText>account secret</FormHelperText>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  )
}