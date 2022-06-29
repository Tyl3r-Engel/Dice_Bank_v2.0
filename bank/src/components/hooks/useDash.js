import { useContext } from 'react';
import DashBoardContext from '../../context/DashBoardProvider';

export default function useDash() {
  const { isMounted, setIsMounted, accounts, setAccounts } = useContext(DashBoardContext)
  return { isMounted, setIsMounted, accounts, setAccounts }
}