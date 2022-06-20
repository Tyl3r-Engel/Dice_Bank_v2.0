import React, { useState } from 'react';
import axios from 'axios'
import { Grid, Typography, Box, Button, TextField } from '@mui/material';

export default function LetterAvatars() {
  const [formValues, setFormValues] = useState({userName : '', userPass : ''});

  const handleChange = e => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name] : value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    axios.post('/login', formValues)
  }

  return (
    <Box sx={{background : '#cc171d', borderRadius : '12px'}}>
      <Grid container
        sx={{
          placeContent : 'center',
          textAlignLast : 'center'
        }}
      >
        <Grid item sx={{padding : '1em'}} xs={12}>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                textAlign: 'center',
                background: 'white',
                padding : '1em',
                borderRadius : '12px'
              }}
            >
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
                  Login
                </Button>
              </Box>
            </Box>
          </form>
        </Grid>

        <Grid item sx={{padding : '1em'}}>
          <Box
            sx={{
              background : '#4d818c',
              padding : '1em',
              borderRadius : '12px'
            }}
          >
            <Typography
              sx={{
                textAlign : 'center',
                color : 'white',
                padding : '1em'
              }}
            >
              Don't have an account?
            </Typography>

            <Button
              href='/register'
              variant='outlined'
              color='inherit'
              sx={{padding : '.5em', color : 'white'}}
            >
              create an account
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}