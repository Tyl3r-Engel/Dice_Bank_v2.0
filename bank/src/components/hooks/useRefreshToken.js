import axios from '../../api/axios';
import useAuth from './useAuth';

export default function useRefreshToken () {
  const { setAuth } = useAuth()

  const refresh = async () => {
    const { data } = await axios.get('/refresh', { withCredentials : true })
    setAuth(prev =>({ ...prev, accessToken : data.accessToken}))
    return data.accessToken
  }
  return refresh
}