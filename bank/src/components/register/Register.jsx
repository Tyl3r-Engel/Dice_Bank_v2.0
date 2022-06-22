import React, { useState } from 'react';
import { Grid, TextField, Box, Button, Paper, Typography, Alert } from '@mui/material';
import logo from '../navBar/logo.png';
import axios from 'axios';

export default function Register() {
  const [hasFailed, setHasFailed] = useState(false)
  const [formValues, setFormValues] = useState({userName : '', userPass : '', errMsg : ''})

  const handleChange = e => {
    const { name, value }= e.target
    setFormValues({
      ...formValues,
      [name] : value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axios.post('/register', formValues)
      console.log(response)
      setFormValues({userName : '', userPass : '', errMsg : ''})
      setHasFailed(false)
    } catch(err) {
      console.log(err)
      setFormValues({userName : '', userPass : '', errMsg : err.message})
      setHasFailed(true)
    }
  }
  return (
    <Grid container>
      <Grid item xs={12}>
        <a href='/'>
          <img src={logo} alt='logo' />
        </a>
      </Grid>

      <Grid item xs={3} />

      <Grid item xs={6}>
        <Paper elevation={20} sx={{padding : '5em', textAlign : 'center'}}>
        <Typography variant='h4'>
          Welcome to Dice Bank, Register here
        </Typography>
        {
          hasFailed && (
            <>
              <Alert severity="error">{formValues.errMsg}</Alert>
            </>
          )
        }
          <form onSubmit={handleSubmit}>
            <Box sx={{padding : '1em'}}>
              <TextField
                type='text'
                label='User Name'
                name = 'userName'
                variant='filled'
                onChange={handleChange}
                value={formValues.userName}
                autoComplete='off'
              />
            </Box>

            <Box sx={{padding : '1em'}}>
              <TextField
                type='password'
                label='Password'
                name = 'userPass'
                variant='filled'
                onChange={handleChange}
                value={formValues.userPass}
                autoComplete='off'
              />
            </Box>

            <Box sx={{padding : '1em'}}>
              <Button
                variant='outlined'
                sx={{color : '#4d818c'}}
                color='inherit'
                type='submit'
              >
                Register
              </Button>
            </Box>
          </form>
        </Paper>
      </Grid>

      <Grid item xs={3} />

    </Grid>
  )
}