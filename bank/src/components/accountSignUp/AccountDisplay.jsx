import React, { useState } from 'react';
import { Grid, Box, Typography, TextField, Checkbox, FormControl, FormLabel, FormGroup, FormControlLabel, Button, Snackbar, Alert } from '@mui/material';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function AccountDisplay({ account }) {
  const { auth: { userName: username, userid } } = useAuth()
  const axios = useAxiosPrivate()
  const navigate = useNavigate()
  const [accountName, setAccountName] = useState(`My ${account.name}`)

  const [accountBal, setAccountBal] = useState({})
  const [balError, setBalError] = useState(false)

  const [isChecked, setIsChecked] = useState(false)

  const [extraInput, setExtraInput] = useState(account.options?.extraInput?.getter())
  const [isExtraInputError, setIsExtraInputError] = useState(false)

  const [isError, setIsError] = useState({ message : '', state : false })

  const handleClose = () => setIsError(false)
  const handleBal = ({ target: { value }}) => {
    try{
      if(!(value - 0)) throw Error('')
      setAccountBal(value)
    } catch(e) {
      setBalError(true)
      setTimeout(() => setBalError(false), 5000)
    }
  }

  const handleSubmit = async () => {
    try{
      if (account.options.type !== 'creditCard') {
        if (
          Object.keys(accountBal).length === 0
          || accountBal < 0
          || accountBal > Math.abs(Number.MIN_SAFE_INTEGER)
        ){
          setBalError(true)
          setTimeout(() => setBalError(false), 5000)
          throw new Error('Account balance is invalid!')
        }
      }

      if (!isChecked){
        throw new Error('Box must be checked to continue!')
      }

      if (account.options?.extraInput?.isConflict(extraInput, setIsExtraInputError)) {
        throw Error(`${account.options?.extraInput?.name} ${account.options?.extraInput?.helperText}`)
      }

      const { extraInput: extraInputInfo, ...otherOptions } = account.options

      const response = await axios.post(
        '/accountSignUp',
        {
          user: { username , userid },
          accountName : account.name,
          userAccountName : accountName,
          accountBal : Object.keys(accountBal).length === 0 ? 0 : Number(accountBal),
          hasAgreed : isChecked,
          options : otherOptions
        }
      )

      if (response?.status === 200) navigate('/dashBoard', { replace : true })
      else throw new Error(response.message)
    } catch({ message, type }) {
      setIsError({message : message, state : true})
    }
  }

  return (
    <Grid container direction='column'>
      <Grid item xs={12} >
        <Typography variant='h2' sx={{textAlign : 'center', marginTop : '1em'}}>
          {account.name}
        </Typography>
      </Grid>
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
          <Typography variant='h5' sx={{padding : '1em', fontWeight : 'light', lineHeight : '1.4em'}}>
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
                    helperText={balError && 'Invalid Key Press or Account Balance must be above 0 and less than 9007199254740991'}
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
                label ={
                  <Typography variant='subtitle2' >
                    I understand this account is in noway actually real and all the "money" and or other perks said to be granted are false.
                  </Typography>
                }
              />


              <Box sx={{ padding : '1em' }}>
                <Button type='submit' variant='contained' onClick={handleSubmit}>Sign Up</Button>
              </Box>

              <Snackbar
                open={isError.state}
                autoHideDuration={5000}
                onClose={handleClose}
              >
                <Alert severity='warning' sx={{ width: '100%' }} onClose={handleClose}>
                  {isError.message}
                </Alert>
              </Snackbar>

            </FormGroup>
          </FormControl>
        </Box>
      </Grid>

    </Grid>
  )
}