import { Box, Paper } from '@mui/material';
import React from 'react';

export default function Loading() {
  return (
    <Box sx={{ textAlign : '-webkit-center'}}>
      <Paper sx={{ borderRadius : '50%', width : '48%', background : 'black' }} elevation={24}>
        <img
        src='https://i.makeagif.com/media/7-16-2022/Je1aWq.gif'
        alt='Rolling Dice'
        style={{ borderRadius : '50%', width : '100%' }}
        />
      </Paper>
    </Box>
  )
}