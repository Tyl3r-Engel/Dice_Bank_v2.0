import React from 'react';
import { Typography, Box, Paper, Button } from '@mui/material';
import {  useNavigate } from 'react-router-dom';

export default function Payment({ currentAccount }) {
  const navigate = useNavigate()
  return (
    <>
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
    </>
  )
}