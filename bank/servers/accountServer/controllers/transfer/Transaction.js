const pool = require('../../../../dataBase/pool')

class Transaction {
  constructor(accountnumber, fromname, amount, waswithdrawl) {
    this.accountnumber = accountnumber
    this.fromname = fromname
    this.amount = amount
    this.date = new Date()
    this.waswithdrawl = waswithdrawl
  }

  async createTransaction() {
    try {
      await pool.query(`
        INSERT INTO transactions (accountnumber, fromname, amount, date, waswithdrawl)
        VALUES ($1, $2, $3, $4, $5)
      `,[this.accountnumber, this.fromname, this.amount, this.date, this.waswithdrawl])
    } catch(e) {
      throw new Error('Error creating transaction')
    }
  }

}

module.exports = Transaction