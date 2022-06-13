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
    <Box sx={{background : 'lightgrey'}}>
      <Grid container sx={{placeContent : 'center'}}>
        <Grid item sx={{padding : '1em'}}>
          <Input autoComplete='off' placeholder='User Name' name = 'userName' onChange={handleChange}/>
        </Grid>
        <Grid item sx={{padding : '1em'}}>
          <Input type='password' autoComplete='off' placeholder='Password' name = 'userPass' onChange={handleChange} />
        </Grid>
        <Grid item sx={{padding : '1em'}}>
          <Button onClick={handleLogin}>
            Login
          </Button>
        </Grid>
        <Grid item sx={{padding : '1em'}}>
          <Box sx={{background : 'lightblue', padding : '1em'}}>
            <Typography>Don't have an account?</Typography>
            <Button sx={{padding : '.5em'}}>create an account</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}