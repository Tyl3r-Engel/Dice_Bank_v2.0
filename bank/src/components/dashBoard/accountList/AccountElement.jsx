import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateAccountElement({ account }) {
  const { status, name, balance } = account
  const formatBal = () => balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const navigate = useNavigate()
  return (
    <Box sx={{background : `${status ? 'lime' : 'red'}`, borderRadius : '100px'}}>
      <Box sx={{background : 'white', borderRadius : '100px', marginRight : '1em'}}>
        <Grid container
          sx={{
            padding : '.5em',
            textAlign : 'center',
            alignItems : 'center'
          }}
        >
          <Grid item xs={4}>
            <Typography sx={{textAlign : 'left', marginLeft : '.5em'}}>
              {name}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            {formatBal()}
          </Grid>
          <Grid item xs={4}>
            <Button onClick={()=>navigate('/viewAccount' , { state : account })}>view account</Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}