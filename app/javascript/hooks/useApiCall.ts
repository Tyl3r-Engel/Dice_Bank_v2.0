import axios from "axios"
import { useEffect, useRef } from "react"

export const privateAxios = axios.create({
  baseURL : "http://localhost:3000/api",
  headers : { "Content-Type" : "application/json" },
  withCredentials : true
})

interface PropTypes {
  method: "get" | "post" | "patch",
  route: string,
  options?: {
    body?: object,
    isPrivate?: boolean
  }
}

export default function useApiCall() {
  const controller = useRef(new AbortController())
  privateAxios.defaults.signal = controller.current.signal
  useEffect(() => {
    return () => {
      controller.current.abort()
    }
  },[])

  return async function({ method, route, options }: PropTypes) {
    const getOptions = () => options?.body && { ...options.body }
      try {
        const rs = await privateAxios[`${method}`](route, getOptions())
        return [rs.data.data, rs]
      } catch (error) {
        return[error.response.data, error.response, error]
      }
  }
}