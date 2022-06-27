import { useContext } from 'react';
import DashBoardContext from '../../context/DashBoardProvider';

export default function useDash() {
  const { isMounted, setIsMounted } = useContext(DashBoardContext)
  return {isMounted, setIsMounted}
}