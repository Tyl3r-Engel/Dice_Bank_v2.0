import U4LoanImg from './4ULoanImg.png'
import carLoanImg from './carLoanImg.png'
import homeLoanImg from './homeLoanImg.png'
import personalLoanImg from './personalLoanImg.png'
export const LoanInfo = [
  {
    name : 'Home Loan',
    dis : 'Everyone needs a place to live and with Dice Bank\'s home loan you can get a set rate low rate (.1% Monthly) for the entirety of the loan.',
    image : homeLoanImg,
    options : {
      'type' : 'loan',
      'amount' : '',
      'interestRate' : '.001',
      'paymentAmount' : 0,
      'extraInput' : {
        'name' : 'Loan Amount',
        'helperText' : 'Input must be amount must be above 0 and less than 9007199254740990',
        'handleChange' : function ({ target: { value }}, setExtraInput, setIsExtraInputError) {
          if(value > Number.MAX_SAFE_INTEGER || value < 1) {
            setIsExtraInputError(true)
            setTimeout(() => setIsExtraInputError(false), 5000)
            return
          }

          setExtraInput(value)
        },
        'isConflict' : function (val, errFunc) {
          if (val > Number.MAX_SAFE_INTEGER || val < 1) {errFunc(true); return true}
          return false
        }
      }
    }
  },
  {
    name : 'Personal Loan',
    dis : 'Maybe you need a boost or just a little bit more for that next thing you want to buy. With a Personal Loan you can take out as much money as you need, and with an interest rate of 12% per year (1% per month) you can finally get that bathroom redone that you have always wanted to do with a Dice Bank Personal Loan.',
    image : personalLoanImg,
    options : {
      'type' : 'loan',
      'amount' : '',
      'interestRate' : '1',
      'paymentAmount' : 0,
      'extraInput' : {
        'name' : 'Loan Amount',
        'helperText' : 'Input must be amount must be above 0 and less than 9007199254740990',
        'handleChange' : function ({ target: { value }}, setExtraInput, setIsExtraInputError) {
          if(value > Number.MAX_SAFE_INTEGER || value < 1) {
            setIsExtraInputError(true)
            setTimeout(() => setIsExtraInputError(false), 5000)
            return
          }

          setExtraInput(value)
        },
        'isConflict' : function (val, errFunc) {
          if (val > Number.MAX_SAFE_INTEGER || val < 1) {errFunc(true); return true}
          return false
        }
      }
    }
  },
  {
    name : 'Car Loan',
    dis : 'The car of your dreams can now be a reality with a Dice Bank Car Loan, its just like the other ones but its called a car loan and the interest is only 2% per month',
    image : carLoanImg,
    options : {
      'type' : 'loan',
      'amount' : '',
      'interestRate' : '2',
      'paymentAmount' : 0,
      'extraInput' : {
        'name' : 'Loan Amount',
        'helperText' : 'Input must be amount must be above 0 and less than 9007199254740990',
        'handleChange' : function ({ target: { value }}, setExtraInput, setIsExtraInputError) {
          if(value > Number.MAX_SAFE_INTEGER || value < 1) {
            setIsExtraInputError(true)
            setTimeout(() => setIsExtraInputError(false), 5000)
            return
          }

          setExtraInput(value)
        },
        'isConflict' : function (val, errFunc) {
          if (val > Number.MAX_SAFE_INTEGER || val < 1) {errFunc(true); return true}
          return false
        }
      }
    }
  },
  {
    name : '4U Loan',
    dis : 'Here at Dice Bank we want to thank you for being an awesome customer so with our new 4U Loan we just give you the amount of money you want (within reason of corse) no questions asked no strings attached, no interest not nothing just free money 4U.',
    image : U4LoanImg,
    options : {
      'type' : 'loan',
      'amount' : '',
      'interestRate' : '0',
      'paymentAmount' : '100%',
      'extraInput' : {
        'name' : 'Loan Amount',
        'helperText' : 'Input must be amount must be above 0 and less than 9007199254740990',
        'handleChange' : function ({ target: { value }}, setExtraInput, setIsExtraInputError) {
          if(value > Number.MAX_SAFE_INTEGER || value < 1) {
            setIsExtraInputError(true)
            setTimeout(() => setIsExtraInputError(false), 5000)
            return
          }

          setExtraInput(value)
        },
        'isConflict' : function (val, errFunc) {
          if (val > Number.MAX_SAFE_INTEGER || val < 1) {errFunc(true); return true}
          return false
        }
      }
    }
  },
]