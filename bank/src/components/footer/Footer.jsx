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
          <Box sx={{ padding : '1em', display : 'inline'}}>
            <Typography variant='body1' sx={{ textAlign : 'center', fontSize : 'small'}}>
              Dice Bank, a passion project designed and built by Tyler Engel
              <p style={{ marginBottom : '0', fontSize : 'medium'}}>
                Get in contact:
              </p>
              <div>
                <a href='https://www.linkedin.com/in/tylerengel' target='_blank' rel='noreferrer'>
                  Linkedin
                </a>
              </div>
              <div>
                <a href='https://github.com/Tyl3r-Engel/Dice_Bank' target='_blank' rel='noreferrer'>
                  Git Hub Repo
                </a>
              </div>
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={4}>
          <Typography variant='body1' sx={{ textAlign : 'center', fontSize : 'small'}}>
            <p style={{marginBottom : '0', fontSize : 'medium'}}>
              Resources:
            </p>
            <div>
              <a href='http://clipart-library.com' target='_blank' rel='noreferrer'>
                Images used
              </a>
            </div>
            <div>
              <a href='https://pixlr.com/' target='_blank' rel='noreferrer'>
                Image editor
              </a>
            </div>
            <div>
              <a href='http://random-word-api.herokuapp.com/' target='_blank' rel='noreferrer'>
                API for account secret generation
              </a>
            </div>
          </Typography>
        </Grid>

      </Grid>
    </Box>
  )
}