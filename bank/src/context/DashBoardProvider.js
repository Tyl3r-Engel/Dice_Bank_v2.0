import { createContext, useState } from 'react';

const DashBoardContext = createContext({})

export const DashBoardProvider = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false)
  return (
    <DashBoardContext.Provider value={{ isMounted, setIsMounted}} >
      {children}
    </DashBoardContext.Provider>
  )
}

export default DashBoardContext