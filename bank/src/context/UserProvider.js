import { Box, Grid, Typography } from '@mui/material';
import { createContext, useState, useEffect } from 'react';
import Loading from '../loading/Loading';
import logo from '../components/navBar/logo.png';
import useAuth from '../components/hooks/useAuth';
import blocker from './blocker.png';

const AuthContext = createContext({})

export const UserProVider = ({ children }) => {
  const [windowSize, setWindowSize] = useState({})
  const { auth } = useAuth()
  useEffect(() => {
    const getWindowDimensions = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      setWindowSize({ width, height })
    }

    window.addEventListener('resize', getWindowDimensions)
    setWindowSize(getWindowDimensions)
    return () => {
      window.removeEventListener('resize', getWindowDimensions)
    }
  }, [])

  if(!windowSize?.width) return <Loading />
  if(auth?.isAuth && windowSize.width < 500) {
    return (
      <Box sx={{ width : '100%', height : '100vh', background : 'lightGray'}}>
        <Grid container direction='column'>
          <Grid item xs={12} sx={{ marginBottom : '50%'}}>
            <img src={logo} alt='logo' style={{ width : '300px', height : '75px'}} />
          </Grid>
          <Grid item xs={6} sx={{ textAlign : 'center'}}>
            <img src={blocker} alt='logo' style={{ width : '300px', height : '300px'}} />
          </Grid>
        </Grid>
      </Box>
    )
  }
  return (
    <AuthContext.Provider value={{ windowSize }}>
      {
        windowSize.width < 500 ? (
          <Grid container>
            <Grid item>
            </Grid>

            <Grid item>
              <Typography variant='h2' sx={{textAlign : 'center'}}>
                Welcome to Dice Bank
              </Typography>
                <br />
              <Typography variant='body1' sx={{textAlign : 'center'}}>
                You are seeing this screen because the window size is not large enough!
                <br />
                <br />
                  if you can expand the window please do so.
                <br />
                <br />
                If you are on a mobile device try rotating your screen so your device is horizontal.
              </Typography>
            </Grid>
          </Grid>
        ) : (
          children
        )
      }
    </AuthContext.Provider>
  )
}

export default AuthContext