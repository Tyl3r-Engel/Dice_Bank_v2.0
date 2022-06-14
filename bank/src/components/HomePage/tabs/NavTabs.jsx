import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Divider, Grid, Typography } from '@mui/material';
import { Paper } from '@mui/material';
import { navElements } from './navElements';

export default function NavBar() {
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
    <>
      {
        navElements.map((element, index) => {
          return (
            <Grid key={`${index} nem`} item xs='auto'>
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
      {
        Object.keys(currentSelection).length > 0 && (
          <Grid item xs={12}>
            <Box sx={{background: 'gainsboro', height: 'auto' }}>
              <Grid container>
                <Grid item xs={5} sx={{padding : '1em'}}>
                  <Grid container direction= 'column' sx={{padding : '3em'}}>

                    <Grid item xs={3} sx={{alignSelf : 'center'}}>
                      <Typography variant='h4'>
                        {currentSelection.description}
                      </Typography>
                    </Grid>

                    <Grid item sx={{padding : '1em'}}>
                      <Divider />
                    </Grid>

                    <Grid item sx={{alignSelf : 'center'}}>
                      <Button color='primary'>get started</Button>
                    </Grid>

                 </Grid>
                </Grid>

                <Grid item xs={1}>
                  <Divider orientation='vertical' />
                </Grid>

                <Grid item xs={1} />

                <Grid item xs={5}>
                  <Grid container direction = 'column'>

                    <Grid item pt={'1em'}>
                      <Typography variant='h5'>
                        Options:
                      </Typography>
                      <Divider />
                    </Grid>

                    {
                      currentSelection.options.map((element, index) => {
                        return (
                          <Grid key={`${index} csm`} item sx={{padding : '1em'}}>
                            <Button onClick={(e) => element.onClick(e)}>{element.name}</Button>
                            <Typography variant='h6'>
                              {element.description}
                            </Typography>
                          </Grid>
                        )
                      })
                    }
                  </Grid>
                </Grid>
              </Grid>
           </Box>
          </Grid>
        )}
    </>
  );
}
