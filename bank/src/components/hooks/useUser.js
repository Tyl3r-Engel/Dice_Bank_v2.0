import { useContext } from 'react';
import UserContext from '../../context/UserProvider';

export default function useUser() {
  const { isMobile, windowSize } = useContext(UserContext)
  return {isMobile, windowSize}
}