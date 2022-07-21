const pool = require('../../dataBase/pool')

const checkIfUserAccount = async (accountId, reqUserId) => {
  try{
    const { rows: [ { userid }] } = await pool.query('SELECT userid FROM accounts WHERE id = $1', [accountId])
    if (userid === reqUserId) return true
  } catch(e) {
    return false
  }
  return false
}

const accountNameChangeController = async (req, res) => {
  const [accountNumber, accountid] = req.baseUrl.split('/')[2].split('-')
  const { newAccountName } = req.body
  const QUERY_STRING = `
    UPDATE accounts
    SET name = $1
    WHERE accountnumber = $2
  ;`;
  try {
    if (!(await checkIfUserAccount(accountid, req.userid))) return res.sendStatus(403)
    await pool.query(QUERY_STRING, [newAccountName, Number(accountNumber)])
    res.sendStatus(402)
  } catch {
    res.sendStatus(500)
  }
}

module.exports = accountNameChangeController