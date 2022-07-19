const pool = require('../../../../dataBase/pool')
const Transaction = require('./Transaction')
const handlePayment = require('./handlePayment')
const checkAccounts = async (toUser, fromUser) => {
  const { rows } = await pool.query(`
    SELECT status, balance, accountnumber
    FROM accounts
    WHERE
      accountnumber = $1
      OR
      accountnumber = $2
      AND
      accountsecret = $3
  `, [fromUser.accountnumber, toUser.accountnumber, toUser.accountsecret])
  if(!rows.every(account => account.status) || rows.length !== 2) throw new Error('One of the supplied accounts is Incorrect or turned off')
  return rows.map(account => account)
}

const handleFail = async (failSafeAccountBal, { accountnumber }, count = 0) => {
  try {
    await pool.query(`
      UPDATE accounts
      SET balance = $1
      WHERE accountNumber = $2
    `,[failSafeAccountBal, accountnumber])
  } catch (e) {
    if (count === 5) throw new Error(`ERROR:: FATAL ERROR HAS ACCORD -> ${e.message}`)
    handleFail(count += 1)
  }
}

const update = async (amount, { accountnumber }) => {
  try {
    await pool.query(`
      UPDATE accounts
      SET balance = $1
      WHERE accountnumber = $2
    `, [amount, accountnumber])
  } catch {
    return false
  }
  return true
}

const getToUserName = async accountnumber => {
  try{
    const { rows: [ toUserName ] } = await pool.query(`
    SELECT username
    FROM users
    WHERE id = (
      SELECT userid
      FROM accounts
      WHERE accountnumber = $1
    )
    `,[accountnumber])
    return toUserName.username
  } catch {
    return 'transfer'
  }
}

const transferController = async (req, res) => {
  let { to, from, amount: tempAmount } = req.body
  try {
    if (!to || !from || !tempAmount) throw new Error('The amount or the to or from user is undefined')
    if (from.userid !== req.userid) throw new Error('User does not own the account being withdrawn from')
    if (to?.type === 'loan' || to?.type === 'creditCard') throw new Error('The account to Transfer to is a credit account(you can only make payments to credit accounts)')

    //check
    const results = await checkAccounts(to, from)
    const toBal = Number(results.filter(element =>Number(element.accountnumber) === to.accountnumber)[0].balance)
    const fromBal = Number(results.filter(element => Number(element.accountnumber) === from.accountnumber)[0].balance)
    const amount = Number(tempAmount)
    if (to?.isPayment) {
      try {
        const didError = await handlePayment(
          [to, toBal],
          [from, fromBal],
          amount,
          update,
          Transaction,
          handleFail
        )
        if (didError) throw didError
        return res.sendStatus(200)
      } catch(e) {
        res.status(500)
        res.send(e.message)
        return res.end()
      }
    }

    if (!(from.type === 'creditCard') && fromBal - amount < 0) throw new Error('Amount is more then account balance')

    //update
    //* to account
    const toAmount = toBal + amount
    const toStatus = await update(toAmount, to, toBal)
    //* from account
    const fromAmount = from.defaultname === 'We Pay For Your Credit' ? fromBal : fromBal - amount
    const fromStatus = await update(fromAmount, from, fromBal)
    if (!toStatus && !fromStatus) {
      try {
        handleFail(toBal, to)
        handleFail(fromBal, from)
        throw new Error('An error has occurred during the transfer')
      } catch (e) {
        throw new Error(e.message)
      }
    }

    //new transaction
    try {
      const toTransaction = new Transaction(
        to.accountnumber,
        to?.name ? from.name : req.username,
        amount,
        false
      )
      await toTransaction.createTransaction()

      const fromTransaction = new Transaction(
        from.accountnumber,
        to?.name ? to.name : await getToUserName(to.accountnumber),
        from.defaultname === 'We Pay For Your Credit' ? 0 : amount,
        true
      )
      await fromTransaction.createTransaction()
    } catch (e) {
      try {
        handleFail(toBal, to)
        handleFail(fromBal, from)
        throw new Error(`An error has occurred during the transaction creation ${e.message}`)
      } catch (err) {
        throw new Error(err.message)
      }
    }

    return res.sendStatus(200)
  } catch(e) {
    res.status(500)
    res.send(e.message)
    return res.end()
  }
}

module.exports = transferController