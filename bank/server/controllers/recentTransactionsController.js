const pool = require('../../dataBase/pool')

const recentTransactionController = async (req, res) => {
  const accountNumbers = req.baseUrl.replace('/recentTransactions/','%20').split('%20').slice(1).map(element => Number(element))
  const QUERY_STRING = `
  SELECT *
  FROM transactions
  WHERE transactions.accountnumber =
  ANY ($1)
  ORDER BY date DESC
  LIMIT 5
  ;`;

  try {
    const { rows } = await pool.query(QUERY_STRING, [accountNumbers])
    res.json(rows)
  } catch(e) {
    console.error(e)
    res.sendStatus(500)
  }
}

module.exports = recentTransactionController