import React, { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { IconButton, Menu, MenuItem } from '@mui/material';
import axios from '../../api/axios';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

export default function NavUserMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const { setAuth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const handleMenu = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const handleLogout = async () => {
    await axios.get('/logout', { withCredentials : true })
    setAuth({})
    navigate('/', { replace : true })
  }

  const handleAccountDelete = async () => {
    if (window.confirm('Press "OK" to confirm account DELETE') === true) {
      await axiosPrivate.delete('/accountDelete')
      handleLogout()
    }
  }

  return (
    <>
      <IconButton size='large' onClick={handleMenu}>
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
        <MenuItem onClick={handleAccountDelete}>DELETE</MenuItem>
      </Menu>
    </>
  )
}