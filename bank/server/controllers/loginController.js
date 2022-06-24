const pool = require('../../dataBase/pool')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const doesUserNameExist = (userName, cb) => {
  pool.query('SELECT userName FROM users WHERE userName=$1', [userName], (err, { rowCount }) => {
    if (err) cb(err, null)
    if (rowCount !== 0) cb(null, true)
    else cb(null, false)
  })
}

const loginController = (req, res) => {
  const { userName, userPass } = req.body
  if (!userName || !userPass) return res.status(400).send('userName and password are required').end()
  const handleErr = (err, res) => res.send(err).end()

  doesUserNameExist(userName, (err, exists) => {
    if (err) handleErr()
    if(exists) {
      pool.query('SELECT userPass FROM users WHERE userName=$1', [userName], (err, { rows: [ { userpass: dbPass }] }) => {
        if (err) handleErr(err)
        bcrypt.compare(userPass, dbPass, (err, result) => {
          if (err) handleErr(err)
          if(result) {
            const accessToken = jwt.sign(
              { userName},
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: '15m' }
            )

            const refreshToken = jwt.sign(
              { userName},
              process.env.REFRESH_TOKEN_SECRET,
              { expiresIn: '3h' }
            )
            pool.query('INSERT INTO sessions (userName, refreshToken) VALUES ($1, $2)', [userName, refreshToken], (err, result) => {
              if(err) handleErr(err)
              res.cookie('jwt', refreshToken, { httpOnly : true, maxAge : 3 * 60 * 60 * 1000})
              res.json({ accessToken }).end()
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