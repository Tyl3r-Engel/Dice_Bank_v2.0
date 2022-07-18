const pool = require('../../dataBase/pool')
const Transaction = require('./controllers/transfer/Transaction')

module.exports = () => {
  const updateInterest = accounts => {
    const accountsToUpdate = []
    accounts.forEach(account => (account.options?.interestRate) && accountsToUpdate.push(account))

    accountsToUpdate.forEach(account => {
      const { options, balance, accountnumber } = account
      const interest = Math.round(100 * (Number(balance) * Number(options.interestRate < 1 ? Number(options.interestRate) : Number(options.interestRate) / 100)))/100
      const newBal = Math.round(100 * (Number(balance) + Number(interest)))/100
      const update = async () => {
        try {
          await pool.query(`
            UPDATE accounts
            SET balance = $1
            WHERE accountnumber = $2
          `, [newBal, accountnumber])

          const interestTransaction = new Transaction(
            accountnumber,
            'Interest',
            interest,
            false
          )
          await interestTransaction.createTransaction()
        } catch(e) {
          console.error(e)
        }
      }
      update()
    })
    console.log('finished updating interest')
  }

  const checkPayments = (accounts) => {
    const accountsToUpdate = []
    accounts.forEach(account => account.options?.nextPaymentDue && accountsToUpdate.push(account))

    accountsToUpdate.forEach(account => {
      const { options, balance, accountnumber} = account
      const today = new Date()
      if (new Date(options.nextPaymentDue) > today) return

      if (options.minPaymentDue === 0) {
        const update = async () => {
          await pool.query(`
          UPDATE accounts
          SET options = $1
          WHERE accountnumber = $2
          `, [options, accountnumber])
        }
        try {
          const newDate = new Date(new Date().setDate(today.getDate() + 30))
           options.nextPaymentDue = `${newDate.getMonth() + 1}/${newDate.getDate()}/${newDate.getFullYear()}`
           options.minPaymentDue = Math.round(100 * Math.abs(balance * .03)) / 100
           update()
        } catch(e) {
          console.error(e)
        }
      } else {
        const update = async () => {
          await pool.query(`
            UPDATE accounts
            SET
              options=$1,
              balance=$2
            Where accountnumber=$3
          `, [options, (Number(balance) - 35), accountnumber])
          const interestTransaction = new Transaction(
            accountnumber,
            'NO PAYMENT',
            35,
            true
          )
          await interestTransaction.createTransaction()
        }
        try {
          options.minPaymentDue = options.minPaymentDue * 2
          const newNextDate = new Date(new Date().setDate(today.getDate() + 30))
          options.nextPaymentDue = `${newNextDate.getMonth() + 1}/${newNextDate.getDate()}/${newNextDate.getFullYear()}`
          update()
        } catch(e) {
          console.log(e)
        }
      }
    })
    console.log('finished checking payments')
  }

  try {
    const mainLoop = async (days, flag) => {
      const { rows: accounts } = await pool.query('SELECT * FROM accounts')
      if (!flag || days === 30) {
        flag = true
        updateInterest(accounts)
        days = 0
      }
      checkPayments(accounts)
      console.log('main loop ran. days::', days)
      setTimeout(async () => await mainLoop(days + 1, flag), 24 * 60 * 60 * 1000)
    }
    let flag = false
    mainLoop(0, flag)
  } catch(e) {
    console.log(e)
  }
}