import React, { useState } from 'react';
import { Grid, Input, Typography, Box, Button } from '@mui/material';

export default function LetterAvatars() {
  const [userName, setUserName] = useState('');
  const [userPass, setUserPass] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'userName') setUserName(value);
    if (name === 'userPass') setUserPass(value);
  }

  const handleLogin = (e) => {
    console.log(userName, userPass)
  }

  return (
    <Box sx={{background : '#cc171d', borderRadius : '12px'}}>
      <Grid container sx={{placeContent : 'center', textAlignLast : 'center'}}>
        <Grid item sx={{padding : '1em'}} xs={12}>
          <Input autoComplete='off' placeholder='User Name' name = 'userName' onChange={handleChange}/>
        </Grid>
        <Grid item sx={{padding : '1em'}} xs={12}>
          <Input type='password' autoComplete='off' placeholder='Password' name = 'userPass' onChange={handleChange} />
        </Grid>
        <Grid item sx={{padding : '1em'}} xs={12}>
          <Button variant='outlined' color='inherit' sx={{color : 'white'}} onClick={handleLogin}>
            Login
          </Button>
        </Grid>

        <Grid item sx={{padding : '1em'}}>
          <Box sx={{background : '#4d818c', padding : '1em', borderRadius : '12px'}}>
            <Typography sx={{textAlign : 'center', color : 'white', padding : '1em'}}>Don't have an account?</Typography>
            <Button variant='outlined' color='inherit' sx={{padding : '.5em', color : 'white'}}>create an account</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}