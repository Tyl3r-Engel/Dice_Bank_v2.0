import React, {useState} from 'react';
import {navElements} from '../HomePage/tabs/navElements.js'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NavMenu () {
  const [isOpen, setIsOpen] = useState(false)
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
        <Grid container direction = 'column'>
          {
            navElements.map((element, index) => {
              return (
                <Grid item key={`${index} nmem`}>
                  <Paper
                    sx={{
                      display : 'inline-block',
                      margin: '.5em',
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
            })
          }
        </Grid>
      </Drawer>
    </>
  )
}
