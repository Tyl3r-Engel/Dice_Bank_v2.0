import React, { useState } from 'react';
import { Grid, Box, Typography, TextField, Checkbox, FormControl, FormLabel, FormGroup, FormControlLabel, Button, Snackbar, Alert } from '@mui/material';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

export default function AccountDisplay({ account }) {
  const [accountName, setAccountName] = useState(`My ${account.name}`)
  const [accountBal, setAccountBal] = useState(0)
  const [balError, setBalError] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [isCheckedError, setIsCheckedError] = useState(false)
  const [extraInput, setExtraInput] = useState(0)
  const [isExtraInputError, setIsExtraInputError] = useState(false)
  const handleClose = () => setIsCheckedError(!isCheckedError)
  const axios = useAxiosPrivate()

  const handleBal = ({ target: { value }}) => {
    try{
      if(!(value - 0)) throw Error('')
      setAccountBal(value)
    } catch(e) {
      setBalError(true)
      setTimeout(() => setBalError(false), 2000)
    }
  }

  const handleSubmit = async () => {
    if (!isChecked){setIsCheckedError(true); return}
    if (account.options?.extraInput.isConflict(extraInput, setIsExtraInputError)) return
    //const response = await axios.post('/createAccount')
    console.log('submit')
  }

  return (
    <Grid container direction='column'>

      <Grid item
        xs={12}
        sx={{
          background: 'linear-gradient(180deg, white 50%, #325765 50%)',
          textAlign : 'center',
          margin : '4em',
          marginBottom : '0em'
        }}
      >
        <img src={account.image} alt='accountImage'/>
      </Grid>

      <Grid item
        sx={{
          background : '#325765',
          textAlign : '-webkit-center',
          margin : '4em',
          marginTop : '0em',
          marginBottom : '0em'
        }}
        xs={12}
      >
        <Box
          sx={{
            background : '#FAF9F6',
            margin : '1em',
            width : '50%',
            textAlign : 'center',
            borderRadius : '25px',
            padding : '1em'
          }}
        >
          <Typography variant='h5'>
            {account.dis}
          </Typography>
        </Box>
      </Grid>

      <Grid item
        sx={{
          background : '#325765',
          margin : '4em',
          marginTop : '0em',
          textAlign : '-webkit-center',
        }}
      >
        <Box
           sx={{
            background : '#FAF9F6',
            margin : '1em',
            width : '50%',
            borderRadius : '25px',
            padding : '1em'
          }}
        >
          <FormControl>
            <FormLabel>Account Details</FormLabel>
            <FormGroup>
              <Box sx={{ padding : '1em' }}>
                <TextField
                  type='text'
                  label='Account Name'
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                />
              </Box>
             {
              account.options.type !== 'creditCard' && (
                <Box sx={{ padding : '1em' }}>
                  <TextField
                    type='number'
                    label={balError ? 'Error' : 'Account Balance'}
                    error={balError}
                    helperText={balError && 'Invalid Key Press or Account Balance must be above 0'}
                    value={accountBal}
                    onChange={handleBal}
                  />
                </Box>
              )
             }
             {
              account.options.extraInput && (
                <Box sx={{ padding : '1em' }}>
                  <TextField
                    type='number'
                    label={isExtraInputError ? 'Error' : account.options.extraInput.name}
                    error={isExtraInputError}
                    helperText={isExtraInputError && account.options.extraInput.helperText}
                    value={extraInput}
                    onChange={(e) => account.options.extraInput.handleChange(e,setExtraInput, setIsExtraInputError)}
                  />
                </Box>
              )
             }

              <FormControlLabel
                control={
                  <Checkbox checked={isChecked} onClick={() => setIsChecked(!isChecked)} />
                }
                label = 'I understand this account is in noway actually real and all the "money" and or other perks said to be granted are false'
              />


              <Box sx={{ padding : '1em' }}>
                <Button type='submit' variant='contained' onClick={handleSubmit}>Sign Up</Button>
              </Box>

              <Snackbar
                open={isCheckedError}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert severity="warning" sx={{ width: '100%' }} onClose={handleClose}>
                  The checkbox must be checked to continue.
                </Alert>
              </Snackbar>

            </FormGroup>
          </FormControl>
        </Box>
      </Grid>

    </Grid>
  )
}