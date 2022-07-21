const pool = require('../../dataBase/pool')

const accountDeleteController = async (req, res) => {
  const { userid } = req
  try {
    await pool.query(`
    DELETE FROM users WHERE id=$1
    `, [userid])
    res.sendStatus(200)
  } catch {
    res.sendStatus(500)
  }
}

module.exports = accountDeleteController