const pool = require('../../../dataBase/pool')

const checkOptions = async (options, accountNumber) => {
  try {
    const { rows } = await pool.query(`
    SElECT options
    FROM accounts
    WHERE accountnumber = $1
    `, [accountNumber])
    const dbOptions = rows[0].options
    return !(JSON.stringify(options) === JSON.stringify(dbOptions))
  } catch {
    return true
  }
}

module.exports = async (to, from, amount, update, Transaction, handleFail) => {
  const [payingAccount, payingAccountBal] = to
  const [creditAccount, creditAccountBal] = from

  try {
    if (amount > payingAccountBal) throw new Error('paying account bal is less then amount')

    const payingAmount = payingAccountBal - amount
    if (payingAccount < 0) return new Error('not enough money in account to cover payment')

    const creditAmount = creditAccountBal + amount

    if (creditAccount.type === 'loan') {
      if (await checkOptions(creditAccount.options, creditAccount.accountnumber)) throw new Error()
      if (Number(creditAccount.options.paymentAmount) === 0) return new Error('Loan already payed off')

      const newPaymentAmount = Number(creditAccount.options.paymentAmount) - amount
      if (newPaymentAmount < 0) return new Error(`payment amount over by ${Math.abs(newPaymentAmount)}`)
      creditAccount.options.paymentAmount = newPaymentAmount

      const newMinPaymentDue = Number(creditAccount.options.minPaymentDue) - amount
      creditAccount.options.minPaymentDue = (newMinPaymentDue < 0) ? 0 : newMinPaymentDue

      await pool.query(`
        UPDATE accounts
        SET options = $1
        WHERE accountnumber = $2
      `, [creditAccount.options, creditAccount.accountnumber])

      await update(payingAmount, payingAccount)

    } else if (creditAccount.type === 'creditCard') {
      if (await checkOptions(creditAccount.options, creditAccount.accountnumber)) throw new Error()
      if (Number(creditAccount.options.minPaymentDue) === 0) return new Error('Payment already made')

      const newPaymentAmount = Number(creditAccount.options.minPaymentDue) - amount
      creditAccount.options.minPaymentDue = (newPaymentAmount < 0) ? 0 : newPaymentAmount

      await pool.query(`
        UPDATE accounts
        SET options = $1
        WHERE accountnumber = $2
      `, [creditAccount.options, creditAccount.accountnumber])

      await update(creditAmount, creditAccount)
      await update(payingAmount, payingAccount)
    } else throw new Error()

    const payingAccountTransaction = new Transaction(
      payingAccount.accountnumber,
      creditAccount.name,
      amount,
      true
    )
    await payingAccountTransaction.createTransaction()

    const creditAccountTransaction = new Transaction(
      creditAccount.accountnumber,
      'Payment Made',
      amount,
      false
    )
    await creditAccountTransaction.createTransaction()
  } catch {
    handleFail(payingAccountBal, payingAccount)
    handleFail(creditAccountBal, creditAccount)
    return new Error('Payment has failed ')
  }
  return false
}