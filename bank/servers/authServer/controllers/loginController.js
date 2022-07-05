const pool = require('../../../dataBase/pool')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const doesUserNameExist = (userName, cb) => {
  pool.query('SELECT username FROM users WHERE username=$1', [userName], (err, { rowCount }) => {
    if (err) cb(err, null)
    if (rowCount !== 0) cb(null, true)
    else cb(null, false)
  })
}

const loginController = (req, res) => {
  const { userName, userPass } = req.body
  if (!userName || !userPass) return res.status(400).send('user name and password are required').end()
  const handleErr = (err, res) => res.send(err).end()

  doesUserNameExist(userName, (err, exists) => {
    if (err) handleErr()
    if(exists) {
      pool.query('SELECT id, userpass FROM users WHERE username=$1', [userName], (err, { rows: [ { userpass: dbPass, id: userid }] }) => {
        if (err) handleErr(err)
        bcrypt.compare(userPass, dbPass, (err, result) => {
          if (err) handleErr(err)
          if(result) {
            const accessToken = jwt.sign(
              { userName, userid },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: '30s' }
            )

            const refreshToken = jwt.sign(
              { userName, userid },
              process.env.REFRESH_TOKEN_SECRET,
              { expiresIn: '3h' }
            )
            pool.query('INSERT INTO sessions (username, userid, refreshtoken) VALUES ($1, $2, $3)', [userName, userid, refreshToken], (err, result) => {
              if(err) handleErr(err)
              res.cookie('jwt', refreshToken, { httpOnly : true, maxAge : new Date(Date.now() + 900000), path : '/'})
              res.set({ 'Cache-Control' : 'no-cache' })
              return res.json({ accessToken, userid }).end()
            })
          } else res.status(401).send('Password Incorrect').end()
        })
      })
    } else {
      res.status(401).send('No user with this user name').end()
    }
  })
}

module.exports = loginController