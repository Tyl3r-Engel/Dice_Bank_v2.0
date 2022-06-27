import React, { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { IconButton, Menu, MenuItem } from '@mui/material';
import axios from '../../api/axios';
import useAuth from '../hooks/useAuth';
import useDash from '../hooks/useDash';
import { Navigate } from 'react-router-dom';

export default function NavUserMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const { setAuth } = useAuth()
  const { setIsMounted} = useDash()

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = async () => {
    await axios.get('/logout', { withCredentials : true })
    setIsMounted(false)
    setAuth({})
    return <Navigate to='/' />
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
        <MenuItem onClick={handleClose}>Log Out</MenuItem>
      </Menu>
    </>
  )
}