import React, { useState } from 'react';
import { Button, Grid, Typography, Box, Snackbar, Alert } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useNavigate } from 'react-router-dom';
import useAccountSignUp from '../hooks/useAccountSignUp';
import useAuth from '../hooks/useAuth';

export default function ServiceElement({ element, size }) {
  if (!size) {
     size = 3
  } else if (!(size === 1 || size === 2 || size === 3)) throw new Error('size prop not set to 1, 2, or 3')
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
        marginBottom : `${size}em`,
        marginLeft : `${size * 2}em`,
        marginRight : `${size * 2}em`,
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
            <img
              src={element.image}
              width={( ((size === 1 || size === 2) && ('150px')) || (size === 3 && ('300px')) )}
              height={( ((size === 1 || size === 2) && ('150px')) || (size === 3 && ('300px')) )}
              alt=''
            />
        </Grid>

        <Grid item xs={7}>
          <Box
            sx={{
              background : '#FAF9F6',
              padding : '2em',
              borderRadius : '50px'
            }}
          >
            <Typography variant={(size === 1  && ('h5')) || (size === 2 && ('h3')) || (size === 3 && ('h2'))} >
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

                  <Typography sx={{padding : '1em', paddingBottom : '0'}}>
                    {element.dis}
                  </Typography>

                  <Button
                    onClick={
                      () => {
                        const { noSignUp, options: { type }} = element
                        if (noSignUp) {
                          const path = type === 'checking' || type === 'savings' ? 'checkingAndSavings' : element.options.type
                          element.noSignUp = false
                          return navigate(`/${path}`)
                        }
                        handleSignUp()
                      }
                    }
                  >
                    {element.noSignUp ? 'See Deals Here!' : 'Sign up now!'}
                  </Button>

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