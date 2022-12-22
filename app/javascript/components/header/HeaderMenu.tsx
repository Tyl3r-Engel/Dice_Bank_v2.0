import React, { useState } from "react"
import IconButton from "@mui/material/IconButton"
import AccountCircle from "@mui/icons-material/AccountCircle"
import MenuItem from "@mui/material/MenuItem"
import Menu from "@mui/material/Menu"
import { useNavigate } from "react-router-dom"
import useApiCall from "../../hooks/useApiCall"
import useApp from "../../hooks/useApp"
import { defaultUser } from "../../contexts/AppProvider"

export interface Action {
  name: string
  action(): void
}

export default function HeaderMenu() {
  const navigate = useNavigate()
  const { user, setUser } = useApp()
  const apiCall = useApiCall()
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null)

  const authMenuItems: Action[] = [
    {
      name: "edit profile",
      action() {
        navigate("")
      }
    },
    {
      name: "dashboard",
      action() {
        navigate(`/${user.displayName}/dashboard`)
      }
    },
    {
      name: "transfer",
      action() {
        navigate("")
      }
    },
    {
      name: "trade",
      action() {
        navigate("")
      }
    },
    {
      name: "services",
      action() {
        navigate("")
      }
    },
    {
      name: "friends",
      action() {
        navigate("")
      }
    },
    {
      name: "Logout",
      action() {
        setUser({...defaultUser, id: null, auth: "unauthorized"})
        const logout = async () => await apiCall({method: "get", route: `/${user.id}/logout`})
        logout().then(() => {
          sessionStorage.clear()
          navigate("/home")
          window.location.reload()
          return false
        })
      }
    }
  ]

  const handleMenu = (e) => setMenuAnchor(e.currentTarget)
  const handleMenuClose = () => setMenuAnchor(null)

  const createMenuItems = (itemNames: Action[]) => {
    const handleClick = (e: Action) => {
      handleMenuClose()
      e.action()
    }

    return itemNames.map((element: Action, index: number) => (
        <MenuItem key={index} onClick={() => handleClick(element)}>
          {element.name}
        </MenuItem>
      )
    )
  }

  return (
    <>
      <IconButton
        size="large"
        onClick={(e) => handleMenu(e)}
        color="default"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={menuAnchor}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        {
          createMenuItems(authMenuItems)
        }
      </Menu>
    </>
  )
}