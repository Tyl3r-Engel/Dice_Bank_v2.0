import React, { useState } from 'react';
import { Button, Grid, Typography, Box, Snackbar, Alert, Paper } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function ServiceElement({ element, size }) {
  if (!size) {
     size = 3
  } else if (!(size === 1 || size === 2 || size === 3)) throw new Error('size prop not set to 1, 2, or 3')
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const handleClose = () => setIsOpen(!isOpen)
  const handleAlert = () => setIsAlertOpen(!isAlertOpen)
  const { auth } = useAuth()
  const navigate = useNavigate()
  const handleSignUp = () => {
    if (!auth.isAuth){ setIsAlertOpen(true); return}
    navigate(
      '/accountSignUp',
      {
        from : location.pathname,
        replace : location.pathname === '/accountSignUp' ? false : true,
        state : JSON.stringify(element, (key, value) => typeof value === 'function' ? value.toString() : value)
      }
    )
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
           <Paper
            sx={{
              borderRadius : '50px',
              margin : '1em',
              textAlign : 'center',
              background : 'white',
              padding : '.1em',
              width : '100%'
            }}
            elevation={24}
           >
            <img
              src={element.image}
              style={{ borderRadius : `${element.options.type === 'loan' ? '50px' : '0'}`}}
              width={( (size === 1 && ('100px')) || (size === 2 && ('150px')) || (size === 3 && ('300px')) )}
              height={( (size === 1 && ('100px')) || (size === 2 && ('150px')) || (size === 3 && ('300px')) )}
              alt=''
            />
           </Paper>
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

                  <Typography
                    sx={{padding : '1em', paddingBottom : '0'}}
                    variant={(size === 1  && ('body2')) || (size === 2 && ('body1')) || (size === 3 && ('h5'))}
                  >
                    {element.dis}
                  </Typography>

                  <Button onClick={handleSignUp}>
                    Sign up now!
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