import { axiosPrivate } from '../../api/axios';
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

export default function useAxiosPrivate() {
  const refresh = useRefreshToken()
  const { auth } = useAuth()

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if(!config.headers['authorization']) {
          config.headers['authorization'] = `Bearer ${auth?.accessToken}`
        }
        return config
      }, err => Promise.reject(err)
    )



    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config
        if ((error.response.status === 403 || error.response.status === 401) && !prevRequest.sent) {
          prevRequest.sent = true
          const newAccessToken = await refresh()
          prevRequest.headers['authorization'] = `Bearer ${newAccessToken}`
          return axiosPrivate(prevRequest)
        }
        return error
      }
    )
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [auth, refresh])

  return axiosPrivate
}