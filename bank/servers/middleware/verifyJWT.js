const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization']
  if(!authHeader) return res.sendStatus(401)
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