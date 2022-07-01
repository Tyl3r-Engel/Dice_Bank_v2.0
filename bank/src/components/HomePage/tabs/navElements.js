export const navElements = [
  {
    'name' : 'Checking & Savings',
    'type' : 'checkingAndSavings',
    'description' : 'Checking and Savings accounts tailored to you',
    'options': [
      {
        'name' : 'Open Checking account',
        'description' : 'Open your first checking account here',
        'onClick' : function(e, cb) {
          e.preventDefault()
          cb('checkingAndSavings')
        }
      },
      {
        'name' : 'Open Savings account',
        'description' : 'Open your first savings account here',
        'onClick' : function(e, cb) {
          e.preventDefault()
          cb('checkingAndSavings')
        }
      }
    ]
  },
  {
    'name' : 'Credit Cards',
    'type' : 'creditCard',
    'description' : 'Find the best credit card to fill your needs',
    'options': [
      {
        'name' : 'Open a credit card',
        'description' : 'Open your first credit card account here',
        'onClick' : function(e, cb) {
          e.preventDefault()
          cb('creditCard')
        }
      },
      {
        'name' : 'Open a business credit card',
        'description' : 'Open your first business credit card account here',
        'onClick' : function(e, cb) {
          e.preventDefault()
          cb('creditCard')
        }
      }
    ]
  },
  {
    'name' : 'Loans',
    'type' : 'loan',
    'description' : 'Whether it\'s for a house, car or you just need a little boost our loan plans put you first',
    'options': [
      {
        'name' : 'Take out a mortgage loan.',
        'description' : 'Make that dream home a reality',
        'onClick' : function(e, cb) {
          e.preventDefault()
          cb('loan')
        }
      },
      {
        'name' : 'Take out a personal loan',
        'description' : 'Need a boost check out these loan options',
        'onClick' : function(e, cb) {
          e.preventDefault()
          cb('loan')
        }
      },
      {
        'name' : 'Take out a car loan',
        'description' : 'Make that dream car a reality',
        'onClick' : function(e, cb) {
          e.preventDefault()
          cb('loan')
        }
      }
    ]
  },
  {
    'name' : 'Stock Trading',
    'type' : 'trading',
    'description' : 'Through all the highs and lows are trading accounts our the best there is',
    'options': [
      {
        'name' : 'Open a trading account',
        'description' : 'Open your first trading account here',
        'onClick' : function(e, cb) {
          e.preventDefault()
          cb('trading')
        }
      }
    ]
  }
];