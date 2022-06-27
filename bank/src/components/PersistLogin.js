import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useRefreshToken from './hooks/useRefreshToken';
import useAuth from './hooks/useAuth';

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
  },[])

  if(isLoading) return <p>Login Persist...</p>
  else return <Outlet />
}