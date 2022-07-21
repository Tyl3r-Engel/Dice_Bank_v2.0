import axios from 'axios';

export default axios.create({
  baseURL : `http://${process.env.REACT_APP_IP}:7777/`
})

export const axiosPrivate = axios.create({
  baseURL : `http://${process.env.REACT_APP_IP}:7777/`,
  headers : { 'Content-Type' : 'application/json' },
  withCredentials : true
})