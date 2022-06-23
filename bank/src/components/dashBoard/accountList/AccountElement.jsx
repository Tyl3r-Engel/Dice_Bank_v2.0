import { Box, Button, Collapse, Grid, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import React, { Fragment, useState } from 'react';

export default function CreateAccountElement({ account: {accountName : name, accountBal : bal, transactions} }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(!isOpen)
  return (
    <Box>
      <Grid container>
        <Grid item xs={6}>
         {name}
        </Grid>
        <Grid item xs={6}>
          {bal}
        </Grid>
        <Grid item xs={12}>
          <List>
            {
              transactions.length > 0 ?
                (
                  <>
                    <ListItemButton onClick={handleOpen}>
                      <ListItemText primary='transactions' />
                    </ListItemButton>
                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                      <List>
                        {
                          transactions.map(({name, amount, wasWithdrawal, date}, index) => (
                            <Fragment key={`${index} tmc`}>
                              <Grid container sx={{background : `${!wasWithdrawal ? 'lightgreen' : 'red'}`}}>
                                <Grid item>
                                  {String(date.toLocaleDateString())}
                                </Grid>
                                <Grid item>
                                  <Typography>{name}</Typography>
                                </Grid>
                                <Grid item>
                                  {wasWithdrawal ? `-${amount}` : `+${amount}`}
                                </Grid>
                              </Grid>

                            </Fragment>
                          ))
                        }
                      </List>
                      <Button>Click Me!</Button>
                    </Collapse>
                  </>
                ) : (
                  <></>
                )
            }
          </List>
        </Grid>
      </Grid>
    </Box>
  )
}