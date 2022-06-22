const pool = require('../../dataBase/pool')
const bcrypt = require('bcrypt');

const doesUserNameExist = (userName, cb) => {
  pool.query('SELECT userName FROM users WHERE userName=$1', [userName], (err, { rowCount }) => {
    if (err) cb(err, null)
    if (rowCount !== 0) cb(null, true)
    else cb(null, false)
  })
}

const loginController = (req, res) => {
  const { userName, userPass } = req.body
  const handleErr = (err, res) => res.send(err).end()

  doesUserNameExist(userName, (err, exists) => {
    if (err) handleErr()
    if(exists) {
      pool.query('SELECT userPass FROM users WHERE userName=$1', [userName], (err, { rows: [ { userpass: dbPass }] }) => {
        if (err) handleErr(err)
        bcrypt.compare(userPass, dbPass, (err, result) => {
          if (err) handleErr(err)
          if(result) res.send('user logged in').end()
          else res.status(401).send('Password Incorrect').end()
        })
      })
    } else {
      res.status(401).send('No user with this user name').end()
    }
  })
}

module.exports = loginController