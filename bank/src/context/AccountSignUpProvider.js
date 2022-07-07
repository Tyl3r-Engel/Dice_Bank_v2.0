import { createContext, useState } from 'react';

const AccountSignUpContext = createContext({})

export const AccountSignUpProvider = ({ children }) => {
  const [selectedAccount, setSelectedAccount] = useState('')
  return (
    <AccountSignUpContext.Provider value={{ selectedAccount, setSelectedAccount}} >
      {children}
    </AccountSignUpContext.Provider>
  )
}

export default AccountSignUpContext