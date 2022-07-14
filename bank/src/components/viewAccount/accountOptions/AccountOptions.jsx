import React,{ useState } from 'react';
import { Box, Typography, TextField, Button, Divider, List, ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function AccountOptions({ currentAccount }) {
  const [accountName, setAccountName] = useState('')
  const [accountStatus, setAccountStatus] = useState(currentAccount.status)
  const [isOpen, setIsOpen] = useState(false)
  const [isAccountDetailsOpen, setIsAccountDetailsOpen] = useState(false)
  const navigate = useNavigate()
  const axios = useAxiosPrivate()

  const handleTransfer = () => {
    navigate('/transfer' , { state : currentAccount })

  }

  const toggleAccountStatus = async () => {
    try {
      await axios.post(`/toggleAccountStatus/${currentAccount.accountnumber}-${currentAccount.id}`, { status : !accountStatus})
      setAccountStatus(!accountStatus)
    } catch(e) {
      console.log(e)
    }
  }

  const handleAccountDelete = () => {
    if (window.confirm('Press "OK" to confirm account deletion') === true) {
      try {
        axios.delete(`/deleteAccount/${currentAccount.accountnumber}-${currentAccount.id}`)
        navigate('/', { repalce : true })
      } catch(e){
        console.log(e)
      }
      return
    }
  }

  const handleNameChange = () => {
    if (window.confirm('Press "OK" to confirm account rename') === true) {
      try {
        axios.post(`/accountNameChange/${currentAccount.accountnumber}-${currentAccount.id}`, { newAccountName : accountName})
        navigate('/', { replace : true })
      } catch(e){
        console.log(e)
      }
      return
    }
    setAccountName('')
  }

  return (
    <Box
      sx={{
        background : '#325765',
        padding : '1em',
        borderRadius : '25px'
      }}
    >
      <Box
        sx={{
          background : 'white ',
          margin : '1em',
          padding : '1em',
          textAlign : '-webkit-center',
          borderRadius : '25px'
        }}
      >
        <Typography
          sx={{
            paddingLeft : '1em',
            paddingTop : '1em',
            textAlign : 'left'
          }}
          variant='h5'
        >
          Account Options:
        </Typography>
        <Divider />
        <List>
          {
            isOpen || isAccountDetailsOpen ? (
              <>
                {
                  isOpen && (
                    <Box sx={{ background : '#FAF9F6', padding : '.5em'}}>
                      <TextField
                        sx={{ margin : '1em'}}
                        type='text'
                        label='Account Name'
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        autoComplete='off'
                        />
                      {
                        accountName.length > 0 && (
                          <Button
                            sx={{ display : 'block', margin : '1em'}}
                            variant='contained'
                            onClick={handleNameChange}
                          >
                            Change name
                          </Button>)
                      }
                    </Box>
                  )
                }
                {
                  isAccountDetailsOpen && (
                    <Box
                      sx={{
                        background : '#FAF9F6',
                        padding : '.7em',
                        textAlign : 'left'
                      }}
                    >
                      <button
                        title='Click To Copy'
                        style={{
                          width : '100%',
                          marginBottom : '.5em',
                          borderRadius : '24px'
                        }}
                        onClick={() =>  navigator.clipboard.writeText(currentAccount.accountsecret)}
                      >
                        <Typography sx={{ padding : '1em'}}>
                          Account Secret:
                          <strong>{` ${currentAccount.accountsecret}`}</strong>
                        </Typography>
                      </button>

                      <button
                        title='Click To Copy'
                        style={{ width : '100%', borderRadius : '24px'}}
                        onClick={() =>  navigator.clipboard.writeText(currentAccount.accountnumber)}
                      >
                        <Typography
                          sx={{ padding : '1em'}}
                        >
                          Account Number:
                          <strong>{` ${currentAccount.accountnumber}`}</strong>
                        </Typography>
                      </button>
                    </Box>
                  )
                }
              </>
            ) : (
              <>
                <ListItemButton onClick={handleTransfer} sx={{justifyContent : 'center'}} >
                  <Typography
                    sx={{
                      display : 'block',
                      margin : '1em',
                      textDecoration : 'underline'
                    }}
                  >
                    Transfer
                  </Typography>
                </ListItemButton>

                <ListItemButton onClick={toggleAccountStatus} sx={{justifyContent : 'center'}}>
                  <Box sx={{ background : `${accountStatus ? 'lime' : 'red'}`, borderRadius : '50px'}}>
                    <Box
                      sx={{
                        background : 'white',
                        padding : '.01em',
                        margin : '.4em',
                        borderRadius : '50px'
                      }}
                    >
                      <Typography
                        sx={{
                          display : 'block',
                          margin : '1em',
                          textDecoration : 'underline'
                        }}
                      >
                        {accountStatus ? 'Turn Off Account' : 'Turn On Account'}
                      </Typography>
                    </Box>
                  </Box>
                </ListItemButton>

                <ListItemButton onClick={handleAccountDelete} sx={{justifyContent : 'center'}}>
                  <Typography
                    sx={{
                      display : 'block',
                      margin : '1em',
                      textDecoration : 'underline'
                    }}
                  >
                    Delete Account
                  </Typography>
                </ListItemButton>
              </>
            )
          }
          {
            !isAccountDetailsOpen && (
              <ListItemButton onClick={() => setIsOpen(!isOpen)} sx={{justifyContent : 'center'}}>
                <Typography
                  sx={{
                    display : 'block',
                    margin : '1em',
                    textDecoration : 'underline',
                  }}
                >
                  Change Account Name
                </Typography>
              </ListItemButton>
            )
          }
          {
            !isOpen && (
              <ListItemButton onClick={() => setIsAccountDetailsOpen(!isAccountDetailsOpen)} sx={{justifyContent : 'center'}} >
                <Typography
                  sx={{
                    display : 'block',
                    margin : '1em',
                    textDecoration : 'underline'
                  }}
                >
                  Account Details
                </Typography>
              </ListItemButton>
            )
          }
        </List>
      </Box>
    </Box>
  )
}