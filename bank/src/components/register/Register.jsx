import React, { useState, useContext } from 'react';
import { Grid, TextField, Box, Button, Paper, Typography, Alert } from '@mui/material';
import logo from '../navBar/logo.png';
import axios from 'axios';
import handleLogin from '../HomePage/handleLogin';
import AuthContext from '../../context/AuthProvider';
import { Navigate } from 'react-router-dom';

export default function Register() {
  const { auth, setAuth } = useContext(AuthContext);
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
      const { data } = await axios.post('/register', formValues)
      if (data === 'user created') handleLogin(e, formValues, setFormValues, setHasFailed, setAuth)
    } catch({ response: { status} }) {
      switch (status) {
        case 409:
          setFormValues({userName : '', userPass : '', errMsg : 'User name already exists'})
          break;

        default:
          break;
      }
      setHasFailed(true)
    }
  }
  if(auth?.isAuth) return <Navigate to='/dashBoard' />
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
                required
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
                required
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