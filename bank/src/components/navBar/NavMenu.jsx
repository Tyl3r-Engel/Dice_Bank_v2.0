import React, {useState} from 'react';
import {navElements} from '../HomePage/tabs/navElements.js'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { Grid, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import NavUserMenu from './NavUserMenu.jsx';
import logo from './logo.png';

export default function NavMenu () {
  const [isOpen, setIsOpen] = useState(false)
  const { auth } = useAuth()
  const navigate = useNavigate()

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const handelNav = (page) => {
    handleOpen()
    navigate(`/${page}`)
  }

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        aria-label="menu"
        onClick={handleOpen}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor={'left'}
        open={isOpen}
        onClose={handleOpen}
      >
        <Box
          sx={{
            background : '#cc171d',
            width : '400px',
            height : '100%',
            overflowY : 'scroll',
            marginY : '1em',
            marginLeft : '1em'
          }}
        >
          <Grid container
            direction = 'column'
            spacing={5}
            sx={{ textAlign : 'center' }}
          >
            {
              auth.isAuth && (
                <Grid item xs={12} >
                  <Box
                    sx={{
                      background : 'white',
                      margin : '1em',
                      borderRadius : '24px'
                    }}
                  >
                    <img src={logo} alt='logo' />
                    <Box sx={{ padding : '0'}}>
                      <NavUserMenu />
                    </Box>
                  </Box>
                </Grid>
              )
            }

            <Grid item>
              <Box sx={{background : 'white', borderRadius : '24px', margin : '1em', marginTop : `${auth.isAuth ? '0' : '20%'}`}}>
                { !auth.isAuth && <img src={logo} alt='logo' />}
                <Grid container direction='column' spacing={5}>
                  {
                    [
                      {type : 'dashboard', name : auth.isAuth ? 'Dashboard' : 'Home' },
                      {type : auth.isAuth ? 'transfer' : 'register', name : auth.isAuth ? 'Transfer' : 'register' },
                      ...navElements
                    ].map((element, index) => (
                      <Grid item key={`${index} nmem`}>
                        <Paper
                          sx={{
                            background : '#325765',
                            color : 'white',
                            display : 'inline-block',
                            padding: '1em',
                            width: 200,
                            hight: 20,
                            textAlign: 'center',
                            '&:hover': {
                              backgroundColor: 'grey',
                              opacity: [0.9, 0.8, 0.7],
                              cursor: 'pointer'
                            },
                            }}
                            elevation={5}
                            onClick={() => handelNav(element.type)}
                        >
                          {element.name}
                        </Paper>
                      </Grid>
                     )
                    )
                  }
                <Grid item xs={12} />
                </Grid>
              </Box>
            </Grid>

          </Grid>
        </Box>
      </Drawer>
    </>
  )
}
