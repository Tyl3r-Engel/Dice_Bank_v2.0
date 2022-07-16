import React from 'react';
import { Box, Typography, Grid } from '@mui/material'
import logo from '../navBar/logo.png'

export default function Footer () {
  return (
    <Box sx={{
        marginTop : '3em',
        position : 'relative',
        bottom : '0',
        left : '0',
        backgroundColor: 'lightgray',
        padding : '2em',
      }}
    >
      <Grid container>
        <Grid item xs={4} sx={{ alignSelf : 'center'}}>
          <img src={logo} alt='logo' />
        </Grid>

        <Grid item xs={4}>
          <div style={{ textAlign : 'center', fontSize : 'small'}}>
            Dice Bank, a passion project designed and built by Tyler Engel
            <Typography variant='body1' style={{ marginBottom : '0', fontSize : 'medium'}}>
              Get in contact:
            </Typography>
            <Typography>
              <a href='https://www.linkedin.com/in/tylerengel' target='_blank' rel='noreferrer'>
                Linkedin
              </a>
            </Typography>
            <Typography>
              <a href='https://github.com/Tyl3r-Engel/Dice_Bank' target='_blank' rel='noreferrer'>
                Git Hub Repo
              </a>
            </Typography>
          </div>
        </Grid>

        <Grid item xs={4}>
          <div style={{ textAlign : 'center', fontSize : 'small'}}>
            <Typography variant='body1' style={{marginBottom : '0', fontSize : 'medium'}}>
              Resources:
            </Typography>
            <Typography>
              <a href='http://clipart-library.com' target='_blank' rel='noreferrer'>
                Images used
              </a>
            </Typography>
            <Typography>
              <a href='https://pixlr.com/' target='_blank' rel='noreferrer'>
                Image editor
              </a>
            </Typography>
            <Typography>
              <a href='http://random-word-api.herokuapp.com/' target='_blank' rel='noreferrer'>
                API for account secret generation
              </a>
            </Typography>
          </div>
        </Grid>

      </Grid>
    </Box>
  )
}