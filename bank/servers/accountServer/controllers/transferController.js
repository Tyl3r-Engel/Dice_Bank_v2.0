const pool = require('../../../dataBase/pool')

const transferController = async (req, res) => {
  const QUERY_STRING = `
  `;
  try {
    // const { rows } = await pool.query(QUERY_STRING, [])
    console.log(req.body)
    return res.sendStatus(200)
  } catch(e) {
    console.log(e)
    res.status(500)
    res.send(e.message)
    return res.end()
  }
}

module.exports = transferController