const pool = require('../../../dataBase/pool')

const dashBoardController = async (req, res) => {
  const QUERY_STRING = `
    SELECT type,
    JSON_AGG(
      json_build_object(
        'userid', userid,
        'type', type,
        'options', options,
        'status', status,
        'name', name,
        'defaultname', defaultname,
        'dateopened', dateopened,
        'amount', amount,
        'accountnumber', accountnumber,
        'accountsecret', accountsecret
      )) accounts
    FROM accounts
    where userid = $1
    GROUP BY type;
  `;

  try {
    const { rows } = await pool.query(QUERY_STRING, [req.userid])
    const accounts = {}
    rows.forEach(accGroup => accounts[accGroup.type] = accGroup.accounts)
    res.json(accounts)

  } catch(e) {
    console.log(e)
    return res.sendStatus(500)
  }
}

module.exports = dashBoardController