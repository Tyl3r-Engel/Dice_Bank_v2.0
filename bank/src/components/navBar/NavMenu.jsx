import React, {useState} from 'react';
import {navElements} from '../HomePage/tabs/navElements.js'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import { Grid, Paper } from '@mui/material';

export default function NavMenu () {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <IconButton
        size="large"
        edge="start"
        aria-label="menu"
        onClick={() => setIsOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor={'left'}
        open={isOpen}
        onClose={() => setIsOpen(false)}
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
                      onClick={(e) => setIsOpen(false)}
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
