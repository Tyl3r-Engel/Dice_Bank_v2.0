const pool = require('../../../dataBase/pool')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(401)
  const refreshToken = cookies.jwt
  try {
    pool.query('SELECT username, userid FROM sessions WHERE refreshToken=$1', [refreshToken], (err, { rows }) => {
      if (err) {console.log(err); return res.sendStatus(403)}
      if (rows.length === 0) {
        res.clearCookie('jwt', { httpOnly : true, path : '/' })
        return res.status(403).json({ message: 'error: please try again'})
      }
      const [ { username, userid } ] = rows
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, verifiedToken) => {
          if (err || username !== verifiedToken.userName || userid !== verifiedToken.userid) return res.sendStatus(403)
          const accessToken = jwt.sign(
            { username, userid },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn : '30s'}
          )
          res.json({ accessToken, username, userid })
        }
      )
    })
  } catch(e) {
    res.sendStatus(401)
  }
}

module.exports = handleRefreshToken