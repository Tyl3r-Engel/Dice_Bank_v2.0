import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Grid } from '@mui/material';
import { Paper } from '@mui/material';

export default function HeaderBar() {
  const accordionElements = [
    {'name' : 'Checking', 'description' : 'this is checkingLorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
    {'name' : 'Savings', 'description' : ' this is savings Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
    {'name' : 'Credit Cards', 'description' : 'this is cc Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
    {'name' : 'Loans', 'description' : 'this is loans Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
    {'name' : 'Stock Trading', 'description' : 'this is stock trading Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
  ];
  const [currentSelection, setCurrentSelection] = useState({})
  const onClickHandler = (e, element) => {
    e.target.style.backgroundColor = 'gainsboro'
    element.tag = e

    if (currentSelection?.name === element.name) {
      e.target.style.backgroundColor = ''
      setCurrentSelection({});
      return;
    }
    if (currentSelection?.tag) currentSelection.tag.target.style.backgroundColor = '';
    setCurrentSelection(element)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Box>
        <Grid container spacing={1}>
          {
            accordionElements.map(element => {
              return (
                <Grid item>
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
                      onClick={(e) => onClickHandler(e, element)}
                  >
                    {element.name}
                  </Paper>
                </Grid>
              )
            })
          }
        </Grid>
        {Object.keys(currentSelection).length > 0 && (
          <Box sx={{background: 'gainsboro'}}>{currentSelection.description}</Box>
        )}
      </Box>
    </Box>
  );
}
