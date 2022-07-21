import axios from 'axios';
export default axios.create({
  baseURL : 'http://localhost:7777/'
})

export const axiosPrivate = axios.create({
  baseURL : 'http://localhost:7777/',
  headers : { 'Content-Type' : 'application/json' },
  withCredentials : true
})