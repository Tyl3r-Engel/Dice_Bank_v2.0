const pool = require('../../dataBase/pool')
const bcrypt = require('bcrypt');

const isUserNameTaken = (userName, cb) => {
  pool.query('SELECT userName FROM users WHERE userName=$1', [userName], (err, { rowCount }) => {
    if (err) cb(err, null)
    if (rowCount === 0) cb(null, false)
    else cb(null, true)
  })
}

const registerController = (req, res) => {
  const { userName, userPass } = req.body
  const queryString = `INSERT INTO users (userName, userPass) VALUES ($1, $2)`;
  const handleErr = (err, res) => res.send(err).end()

  isUserNameTaken(userName, (err, result) => {
    if (err) handleErr(err)
    if (result) {
      res.status(409).end()
      return
    }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) handleErr(err)
      bcrypt.hash(userPass, salt, (err, hash) => {
        if (err) handleErr(err)
        pool.query(queryString, [userName, hash], (err, result) => {
          if (err) handleErr(err)
          res.send('user created').end()
        });
      })
    })
  })
}

module.exports = registerController;
