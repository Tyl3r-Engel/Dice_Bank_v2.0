const pool = require('../../dataBase/pool')

const handleLogout = (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204)
  const refreshToken = cookies.jwt

  pool.query('DELETE FROM sessions WHERE refreshToken=$1', [refreshToken], (err, result) => {
    if (err) return res.stats(500).send(err).end()
    res.clearCookie('jwt', { httpOnly : true })
    res.sendStatus(204)
  })
}

module.exports = handleLogout