import React,{ useState } from 'react';
import { Grid, Typography, Box, Paper, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../navBar/NavBar';
import Footer from '../footer/Footer';
import { useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import TransactionsList from './transactionsList/TransactionsList';
import AccountOptions from './accountOptions/AccountOptions';
import SpendingGraph from './spendingGraph/SpendingGraph';
import Loading from '../../loading/Loading';

export default function ViewAccount() {
  const location = useLocation()
  const [currentAccount, setCurrentAccount] = useState(location.state)
  const axios = useAxiosPrivate()
  const [isMounted, setIsMounted] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await axios.get(`/accountTransactions/${currentAccount.accountnumber}-${currentAccount.id}`)
        if (response?.response?.status === 403 || response?.response?.status === 401) throw new Error('unauthorized')
        setCurrentAccount(prev => ({ ...prev, transactions : response.data}))
        setIsMounted(true)
      } catch(e) {
        navigate('/', { replace : true})
      }
    }
    getTransactions()
    if (currentAccount.options?.paymentAmount) {
      setCurrentAccount(prev => (
        {
          ...prev,
          options: {
            ...prev.options,
            paymentAmount : String(currentAccount.options.paymentAmount).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
        }
      ))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  if(!isMounted) return <Loading />
  return(
    <Grid container direction='column'>
      <Grid item xs={12}>
        <NavBar />
      </Grid>

      <Grid item xs={12} sx={{ margin : '2em'}}>
        <Grid container spacing={6}>
          <Grid item xs={8}>
            <Typography
              sx={{
                textAlign : 'center',
                padding : '1em',
                paddingBottom : '0',
                textDecoration : 'underline',
              }}
              variant='h2'
            >
              {currentAccount.name}
            </Typography>
            <br />
            <Typography
              sx={{
                textAlign : 'center',
                padding : '.1em',
                marginBottom : '.6em'
              }}
              variant='h2'
              >
              ${currentAccount.balance}
            </Typography>
            {
              (currentAccount.type === 'loan' && currentAccount.options?.paymentAmount !== 0) && (
                <Box sx ={{ textAlign : '-webkit-center'}}>
                  <Paper
                    sx={{ borderRadius : '50%', width : '50%' }}
                    elevation={24}
                  >
                    <Box
                      sx={{
                        borderRadius : '50%',
                        background : '#cc171d',
                        padding : '1em'
                      }}
                    >
                      <Box
                        sx={{
                          borderRadius : '50%',
                          background : 'white',
                          padding : '1em'
                        }}
                      >
                        <Typography
                          sx={{
                            textAlign : 'center',
                            padding : '1em'
                          }}
                          variant='h6'
                        >
                          Payment balance : ${currentAccount.options.paymentAmount}
                          <br />
                          Next payment due by : {currentAccount.options.nextPaymentDue}
                          <br />
                          Minimum payment : ${currentAccount.options.minPaymentDue}
                          <br />
                          <Button
                            variant='contained'
                            sx={{
                              color : 'white',
                              backgroundColor : '#325765',
                              margin : '.5em'
                            }}
                            onClick={() => navigate('/transfer', { state : currentAccount})}
                          >
                            pay
                          </Button>
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Box>
              )
            }
            {
              (currentAccount.type === 'creditCard') && (
                <Box sx ={{ textAlign : '-webkit-center'}}>
                 <Paper
                    sx={{ borderRadius : '50%', width : '50%' }}
                    elevation={24}
                  >
                    <Box
                      sx={{
                        borderRadius : '50%',
                        background : '#cc171d',
                        padding : '1em'
                      }}
                    >
                      <Box
                        sx={{
                          borderRadius : '50%',
                          background : 'white',
                          padding : '1em'
                        }}
                      >
                        <Typography
                          sx={{
                            textAlign : 'center',
                            padding : '1em'
                          }}
                          variant='h6'
                        >
                          Next payment due by : {currentAccount.options.nextPaymentDue}
                          <br />
                          Minimum payment : ${currentAccount.options.minPaymentDue}
                          <br />
                          <Button
                            variant='contained'
                            sx={{
                              color : 'white',
                              backgroundColor : '#325765',
                              margin : '.5em'
                            }}
                            onClick={() => navigate('/transfer', { state : currentAccount})}
                          >
                            pay
                          </Button>
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Box>
              )
            }
            <TransactionsList transactions={currentAccount.transactions} type={currentAccount.type} />
          </Grid>
          <Grid item xs={4} sx={{ display : 'block'}}>
            <AccountOptions currentAccount={currentAccount} setIsMounted={setIsMounted}/>
            <br/>
            <SpendingGraph transactions={currentAccount.transactions} type={currentAccount.type}/>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  )
}