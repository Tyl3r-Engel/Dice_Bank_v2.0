const pool = require('../../../dataBase/pool')

const accountSignUpController = (req, res) => {
  console.log(req.body)
  const { user: { username, userid }, accountName, userAccountName, accountBal, hasAgreed, options } = req.body
  if (!username || !userid || !accountName || !userAccountName || !(accountBal >= 0) || hasAgreed !== true || !options) return res.sendStatus(400)
  res.sendStatus(200)
}

module.exports = accountSignUpController