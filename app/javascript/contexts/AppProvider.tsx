import React, { createContext, useState, useEffect } from "react"
import useApiCall from "../hooks/useApiCall"

//* TYPES
export type ScreenSize = { width: number, height: number }
export interface User {
  id: number | null,
  displayName: string,
  primaryAccountNumber: number | null
  auth: "authorized" | "unauthorized" | "pending"
}
export interface AppContextTypes {
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  screenSize: ScreenSize
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
}

//* Default values for app context
//todo >> Add a switch statement to assign word size
//todo >> type deviseScreen = {"x-small": <319 } | { "small": 320 } | { "medium": 600 } | { "large": 1000 } | {"x-large": 1200+}
const isLoading = true
const screenSize: ScreenSize = { width: 0, height: 0 }
const setIsLoading = ( (() => { return }) as React.Dispatch<React.SetStateAction<boolean>> )

const ssId = parseInt(`${sessionStorage.getItem("userId")}`)
export const defaultUser: User = {
  id: Number.isNaN(ssId) ? null : ssId,
  displayName: "",
  primaryAccountNumber: null,
  auth: Number.isNaN(ssId) ? "unauthorized" : "pending"
}
const setUser = ( (() => { return }) as React.Dispatch<React.SetStateAction<User>> )
export const appContextDefaults: AppContextTypes = { isLoading, setIsLoading, screenSize, user: defaultUser, setUser }
const AppContext = createContext<AppContextTypes>(appContextDefaults)


// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }: { children : React.ReactNode } ) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [screenSize, setScreenSize] = useState<ScreenSize>({ width: 0, height: 0 })
  const [user, setUser] = useState<User>(defaultUser)
  const apiCall = useApiCall()

  const getWindowDimensions = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    setScreenSize({ width, height })
  }

  const getUser = async () => {
    if (!user.id) return
    try {
      const [data] = await apiCall({method: "get", route: `/${user.id}/me`})
      if(data.error) throw new Error(data.error)
      const { id, attributes: { display_name, primary_account_num } } = data
      setUser({ id, displayName: display_name, primaryAccountNumber: primary_account_num, auth: "authorized"})
    } catch (error) {
      sessionStorage.clear()
      setUser({...defaultUser, id: null, auth: "unauthorized"})
    }
  }

  useEffect(() => {
    getUser()
    getWindowDimensions()
    window.addEventListener("resize", getWindowDimensions)
    return () => {
      window.removeEventListener("resize", getWindowDimensions)
    }
  },[])

  const providerValue: AppContextTypes = {
    isLoading,
    "setIsLoading": (setIsLoading as React.Dispatch<React.SetStateAction<boolean>>),
    screenSize,
    user,
    setUser
  }

  return (
    <AppContext.Provider value={providerValue} >
      {children}
    </AppContext.Provider>
  )
}

export default AppContext