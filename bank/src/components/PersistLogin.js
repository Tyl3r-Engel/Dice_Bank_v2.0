import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useRefreshToken from './hooks/useRefreshToken';
import useAuth from './hooks/useAuth';
import Loading from '../loading/Loading';

export default function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true)
  const { auth } = useAuth()
  const refresh = useRefreshToken()

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch(e) {
        console.log(e)
      } finally {
        setIsLoading(false)
      }
    }
    auth.isAuth ? setIsLoading(false) : verifyRefreshToken()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if(isLoading) return <Loading />
  else return <Outlet />
}