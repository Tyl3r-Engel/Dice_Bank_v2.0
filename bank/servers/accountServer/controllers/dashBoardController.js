const pool = require('../../../dataBase/pool')
const path = require('path')
const dashBoardController = async (req, res) => {
  const QUERY_STRING = `
    SELECT type,
    JSON_AGG(
      json_build_object(
        'id', id,
        'userid', userid,
        'type', type,
        'options', options,
        'status', status,
        'name', name,
        'defaultname', defaultname,
        'dateopened', dateopened,
        'balance', balance,
        'accountnumber', accountnumber,
        'accountsecret', accountsecret
      )) accounts
    FROM accounts
    where userid = $1
    GROUP BY type;
  `;

  try {
    if(req?.wasRefresh) return res.sendFile(path.join(__dirname, '../../../build'))
    const { rows } = await pool.query(QUERY_STRING, [req.userid])
    const accounts = {}
    rows.forEach(accGroup => accounts[accGroup.type] = accGroup.accounts)
    res.set({ 'Cache-Control' : 'no-cache' }).json(accounts)
  } catch {
    return res.sendStatus(500)
  }
}

module.exports = dashBoardController