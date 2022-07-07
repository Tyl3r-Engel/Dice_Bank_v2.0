import React, { useState } from 'react';
import { Button, Grid, Typography, Box, Snackbar, Alert } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useNavigate } from 'react-router-dom';
import useAccountSignUp from '../hooks/useAccountSignUp';
import useAuth from '../hooks/useAuth';

export default function ServiceElement({ element }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const handleClose = () => setIsOpen(!isOpen)
  const handleAlert = () => setIsAlertOpen(!isAlertOpen)
  const { auth } = useAuth()
  const navigate = useNavigate()
  const { setSelectedAccount } = useAccountSignUp()

  const handleSignUp = () => {
    if (!auth.isAuth){ setIsAlertOpen(true); return}
    setSelectedAccount(element)
    navigate('/accountSignUp', { replace : true})
  }

  return (
    <Box
      sx={{
        background : '#325765',
        marginBottom : '3em',
        marginLeft : '6em',
        marginRight : '6em',
        borderRadius : '100px'
      }}
    >
      <Grid container
        sx={{
          textAlign : 'center',
          padding : '1em',
          alignItems : 'center'
        }}
        columnSpacing={4}
      >
        <Grid item xs={4}>
          <img src={element.image} alt='' />
        </Grid>

        <Grid item xs={7}>
          <Box
            sx={{
              background : '#FAF9F6',
              padding : '2em',
              borderRadius : '50px'
            }}
          >
            <Typography variant='h4'>
              {element.name}
            </Typography>

            <Button
              sx={{
                'background' : isOpen ? 'lightgray' : '',
                marginTop : '.5em'
              }}
              onClick={handleClose}
            >
              {isOpen ? 'Show Less' : 'Show More' }
              {isOpen ? <ArrowDropUpIcon />  : <ArrowDropDownIcon /> }
            </Button>

            {
              isOpen && (
                <Box sx={{background : 'lightgray', borderRadius : '25px'}}>

                  <Typography sx={{padding : '.5em'}}>
                    {element.dis}
                  </Typography>

                  <Button onClick={handleSignUp}>Sign up now!</Button>

                  <Snackbar
                    open={isAlertOpen}
                    autoHideDuration={6000}
                    onClose={handleAlert}
                  >
                    <Alert onClose={handleAlert} severity="warning" sx={{ width: '100%' }}>
                      <span>
                        {'You need to be logged in! You can register '}
                        <a href='/register'>
                          here.
                        </a>
                      </span>
                    </Alert>
                  </Snackbar>

                </Box>
              )
            }
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}