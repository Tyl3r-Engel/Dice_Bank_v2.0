import axios from '../../api/axios';
import useAuth from './useAuth';

export default function useRefreshToken () {
  const { setAuth } = useAuth()

  const refresh = async () => {
    try {
      const { data: {accessToken, username: userName} } = await axios.get('/refresh', { withCredentials : true })
      setAuth(prev =>({ ...prev, accessToken : accessToken, userName, isAuth : true}))
      return accessToken
    } catch(e) {
      return e
    }
  }
  return refresh
}