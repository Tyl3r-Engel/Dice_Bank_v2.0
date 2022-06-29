import { createContext, useState } from 'react';

const DashBoardContext = createContext({})

export const DashBoardProvider = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false)
  const [accounts, setAccounts] = useState({})
  return (
    <DashBoardContext.Provider value={{ isMounted, setIsMounted, accounts, setAccounts }} >
      {children}
    </DashBoardContext.Provider>
  )
}

export default DashBoardContext