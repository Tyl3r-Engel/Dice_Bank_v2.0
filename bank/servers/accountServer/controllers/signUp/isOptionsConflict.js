module.exports = (options, type, accountBal, accountName) => {
  if (type === 'loan') {
    if (accountName === 'Home Loan')
      return !(
        Object.keys(options).length === 3
        && Number(options.paymentAmount) === 0
        && Number(options.interestRate) === .001
        &&  options.amount === ''
        && type === 'loan'
      )
    else if (accountName === 'Personal Loan')
      return !(
        Object.keys(options).length === 3
        && Number(options.paymentAmount) === 0
        && Number(options.interestRate) === 1
        &&  options.amount === ''
        && type === 'loan'
      )
    else if (accountName === 'Car Loan')
      return !(
        Object.keys(options).length === 3
        && Number(options.paymentAmount) === 0
        && Number(options.interestRate) === 2
        &&  options.amount === ''
        && type === 'loan'
      )
    else if (accountName === '4U loan')
      return !(
        Object.keys(options).length === 3
        && Number(options.paymentAmount) === 0
        && Number(options.interestRate) === 0
        &&  options.amount === ''
        && type === 'loan'
      )
    return false
  } else if ( type === 'checking' || type === 'savings' || type === 'trading') {
    if (accountName === 'Business Checking')
      return !(
        Object.keys(options).length === 2
        && Number(options.interestRate) === 1
        &&  options.promo === '25% init deposit'
        && type === 'checking'
      )
    else if (accountName === 'Standard Checking')
        return !(
          Object.keys(options).length === 1
          && Number(options.interestRate) === 1
          && type === 'checking'
        )
    else if (accountName === 'You Set Your Rate Savings')
      return !(
        Object.keys(options).length === 1
        && (Number(options.interestRate) <= 100 && Number(options.interestRate) > 0)
        && type === 'checking'
      )
    else if (accountName === 'Trading')
      return !(
       type === 'trading'
      )
    else return true
  } else if ( type === 'creditCard') {
    if (accountName === 'Standard Credit Card')
      return !(
        Object.keys(options).length === 2
        && Number(options.interestRate) === 0.005
        && Number(options.maxBal) === 1000000
        && type === 'creditCard'
      )
    else if (accountName === 'We Pay For Your Credit')
      return !(
        Object.keys(options).length === 1
        && options.noCharge
        && type === 'creditCard'
      )
    else if (accountName === 'Gold Rewards')
      return !(
        Object.keys(options).length === 1
        && options.noCharge
        && type === 'creditCard'
      )
    else if (accountName === 'Railway+ Credit Card')
      return !(
        Object.keys(options).length === 2
        && Number(options.interestRate) === 6
        &&  options.promo === '25% init deposit'
        && type === 'creditCard'
      )
    else return true
  } else {
    return true
  }
}
