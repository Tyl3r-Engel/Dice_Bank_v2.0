import React, { useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material'
import logo from '../navBar/logo.png'
import useRefreshToken from '../hooks/useRefreshToken';
import useUser from '../hooks/useUser';

export default function Footer () {
  const refresh = useRefreshToken()
  const { windowSize } = useUser()
  useEffect(() => {
    const checkRefresh = async () => {
      try {
        await refresh()
      } catch {}
    }
    checkRefresh()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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
          <img src={logo} alt='logo'style={{ width : '100%', maxWidth : '300px', height : '100%', maxHeight : '75px'}} />
        </Grid>

        <Grid item xs={4}>
          <div style={{ textAlign : 'center', fontSize : windowSize.width < 600 ? 'x-small' :'small'}}>
            Dice Bank, a passion project designed and built by Tyler Engel
            <br />
            If you encounter any bugs or problems let me know!
            <br />
            Thank you for visiting Dice Bank.
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
          <div style={{ textAlign : 'center', fontSize : windowSize.width < 600 ? 'x-small' :'small'}}>
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