const pool = require('../../../dataBase/pool')

const checkIfUserAccount = async (accountId, reqUserId) => {
  try{
    const { rows: [ { userid }] } = await pool.query('SELECT userid FROM accounts WHERE id = $1', [accountId])
    if (userid === reqUserId) return true
  } catch(e) {
    return false
  }
  return false
}



const dashBoardController = async (req, res) => {
  const [accountNumber, accountid] = req.baseUrl.substr(req.baseUrl.length - 12).split('-')
  const QUERY_STRING = `
    SELECT *
    FROM transactions
    WHERE accountNumber = $1
  `;
  try {
    if (!(await checkIfUserAccount(accountid, req.userid))) return res.sendStatus(403)
    const { rows: transactions } = await pool.query(QUERY_STRING, [Number(accountNumber)])
    res.json(transactions)
  } catch(e) {
    console.log(e)
    res.sendStatus(500)
  }
}

module.exports = dashBoardController