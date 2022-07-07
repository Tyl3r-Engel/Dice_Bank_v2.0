import { useContext } from 'react';
import AccountSignUpContext from '../../context/AccountSignUpProvider';

export default function useAccountSignUp() {
  const { selectedAccount, setSelectedAccount } = useContext(AccountSignUpContext)
  return {selectedAccount, setSelectedAccount}
}