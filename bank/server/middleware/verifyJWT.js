const jwt = require('jsonwebtoken')
const axios = require('axios')
require('dotenv').config()

module.exports = async (req, res, next) => {
  let authHeader = req.headers['authorization']
  if(!authHeader && req.cookies.jwt) {
    try {
      const{ data: { accessToken, username, userid } }= await axios.get(
        'http://localhost:7777/refresh',
        {
          withCredentials: true,
          headers : {
            'origin' : 'http://localhost:7777',
            cookie : `jwt=${req.cookies.jwt}`
          }
        }
      )
      req.username = username
      req.userid = userid
      authHeader = `Bearer ${accessToken}`
      req.wasRefresh = true
    } catch {
      return res.sendStatus(401)
    }
  }

  if(!req.cookies.jwt) return res.sendStatus(401)
  jwt.verify(
    authHeader.split(' ')[1],
    process.env.ACCESS_TOKEN_SECRET,
    (err, token) => {
      if(err) return res.sendStatus(403)
      req.username = token.username
      req.userid = token.userid
      next()
    }
  )
}