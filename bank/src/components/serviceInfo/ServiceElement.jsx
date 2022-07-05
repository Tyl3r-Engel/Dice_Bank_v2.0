import React, { useState } from 'react';
import { Button, Grid, Typography, Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export default function ServiceElement({ element }) {
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = () => setIsOpen(!isOpen)

  return (
    <Box
      sx={{
        background : '#325765',
        marginBottom : '3em',
        marginLeft : '6em',
        marginRight : '6em',
        borderRadius : '100px'
      }}
    >
      <Grid container
        sx={{
          textAlign : 'center',
          padding : '1em',
          alignItems : 'center'
        }}
        columnSpacing={4}
      >
        <Grid item xs={4}>
          <img src={element.image} alt='' />
        </Grid>

        <Grid item xs={7}>
          <Box
            sx={{
              background : '#FAF9F6',
              padding : '2em',
              borderRadius : '50px'
            }}
          >
            <Typography variant='h4'>
              {element.name}
            </Typography>

            <Button
              sx={{
                'background' : isOpen ? 'lightgray' : '',
                marginTop : '.5em'
              }}
              onClick={handleClick}
            >
              {isOpen ? 'Show Less' : 'Show More' }
              {isOpen ? <ArrowDropUpIcon />  : <ArrowDropDownIcon /> }
            </Button>

            {
              isOpen && (
                <Box sx={{background : 'lightgray', borderRadius : '25px'}}>
                  <Typography sx={{padding : '.5em'}}>
                    {element.dis}
                  </Typography>
                  <Button>Sign up now!</Button>
                </Box>
              )
            }
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}