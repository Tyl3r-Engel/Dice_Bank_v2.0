const pool = require('../../../dataBase/pool')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(401)
  const refreshToken = cookies.jwt
  console.log(refreshToken)
  pool.query('SELECT username FROM sessions WHERE refreshToken=$1', [refreshToken], (err, { rows: [ { username } ] }) => {
    if (err) {console.log(err); return res.sendStatus(403)}
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, verifiedToken) => {
        if (err || username !== verifiedToken.userName) return res.sendStatus(403)
        const accessToken = jwt.sign(
          { username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn : '30s'}
        )

        res.json({ accessToken, username })
      }
    )
  })
}

module.exports = handleRefreshToken