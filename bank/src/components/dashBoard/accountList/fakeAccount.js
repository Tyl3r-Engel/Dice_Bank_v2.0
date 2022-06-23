export const fakeAccount = [
  {
    accountType : 'checking',
    accountName : 'my checking',
    accountBal : 15600,
    transactions : [
      {
        name : 'Monk Donald\'s',
        amount : 13.78,
        wasWithdrawal : true,
        date : new Date()
      },
      {
        name : 'paycheck',
        amount : 2000,
        wasWithdrawal : false,
        date : new Date()
      },
      {
        name : 'store',
        amount : 76.33,
        wasWithdrawal : true,
        date : new Date()
      }
    ]
  },
  {
    accountType : 'savings',
    accountName : 'my savings',
    accountBal : 156300,
    transactions : [
      {
        name : 'house payment',
        amount : 1378,
        wasWithdrawal : true,
        date : new Date()
      },
      {
        name : 'car payment',
        amount : 200,
        wasWithdrawal : true,
        date : new Date()
      },
      {
        name : 'transfer',
        amount : 3000,
        wasWithdrawal : false,
        date : new Date()
      }
    ]
  },
  {
    accountType : 'checking',
    accountName : 'my seconded checking',
    accountBal : 6000,
    transactions : [
      {
        name : 'xbox',
        amount : 10.78,
        wasWithdrawal : true,
        date : new Date()
      },
      {
        name : 'netflix',
        amount : 12.22,
        wasWithdrawal : true,
        date : new Date()
      },
      {
        name : 'doorDash',
        amount : 25,
        wasWithdrawal : true,
        date : new Date()
      }
    ]
  },
]