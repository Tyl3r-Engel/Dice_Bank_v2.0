const pool = require('../../../dataBase/pool')

const dashBoardController = (req, res) => {
  const QUERY_STRING = `
    SELECT type,
    JSON_AGG(
      json_build_object(
        'userid', userid,
        'type', type,
        'options', options,
        'status', status,
        'name', name,
        'amount', amount,
        'dateopened', dateopened,
        'number', number,
        'routing', routing
      )) accounts
    FROM accounts
    where userid = $1
    GROUP BY type;
  `;

  pool.query(QUERY_STRING, [req.userid], (err, { rows }) => {
    if (err){console.log(err); return res.sendStatus(500)}
    const accounts = {}
    rows.forEach(accGroup => accounts[accGroup.type] = accGroup.accounts)
    res.json(accounts)
  })
}

module.exports = dashBoardController