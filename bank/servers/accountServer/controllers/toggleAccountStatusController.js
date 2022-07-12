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

const toggleAccountStatusController = async (req, res) => {
  const [accountNumber, accountid] = req.baseUrl.substr(req.baseUrl.length - 12).split('-')
  const { status } = req.body
  const QUERY_STRING = `
    UPDATE accounts
    SET status = $1
    WHERE accountNumber = $2
  `;
  try {
    if (!(await checkIfUserAccount(accountid, req.userid))) return res.sendStatus(403)
    await pool.query(QUERY_STRING, [status, Number(accountNumber)])
    res.sendStatus(200)
  } catch(e) {
    console.log(e)
    res.sendStatus(500)
  }
}

module.exports = toggleAccountStatusController