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

const deleteAccountController = async (req, res) => {
  const [accountNumber, accountid] = req.baseUrl.split('/')[2].split('-')
  const QUERY_STRING = `
    DELETE
    FROM accounts
    WHERE accountNumber = $1
  `;
  try {
    if (!(await checkIfUserAccount(accountid, req.userid))) return res.sendStatus(403)
    await pool.query(QUERY_STRING, [Number(accountNumber)])
    res.sendStatus(200)
  } catch {
    res.sendStatus(500)
  }
}

module.exports = deleteAccountController