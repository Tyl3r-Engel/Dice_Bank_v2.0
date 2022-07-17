const Transaction = require('../transfer/Transaction')

module.exports = async (type, options, accountBal, accountName, date, accountnumber, cb) => {
  if (type === 'loan' || type === 'creditCard') {
    if (type === 'loan' && accountName !== '4U loan') options.paymentAmount = accountBal
    const nextDate = new Date(new Date().setDate(date.getDate() + 30))
    options.nextPaymentDue =`${nextDate.getMonth() + 1}/${nextDate.getDate()}/${nextDate.getFullYear()}`
    options.minPaymentDue = accountBal !== 0 ? (accountBal > 100 ? 50 : 25 ): 5
  }

  if (options.promo) {
    try {
      const promoDepositAmount = accountBal * .25
      const newBal = accountBal + promoDepositAmount
      const promoDepositTransaction = new Transaction(
        accountnumber,
        'Promo deposit',
        promoDepositAmount,
        false
      )
      await cb(newBal)
      await promoDepositTransaction.createTransaction()
    } catch(e) {
      return new Error('Failed to set up payments')
    }
  } else await cb(accountBal)
}