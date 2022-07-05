import savings from './savings.png'
import standardChecking from './standardChecking.png'
import business from './business.png'
export const CheckingAndSavingsInfo = [
  {
    name : 'Standard Checking',
    dis : 'This is the way to go if you want to play it safe. With more unlimited then you have every seen before with our unlimited transfers and unlimited accounts! Accounts also come with a yearly 10% interest to show our appreciation for choosing Dice Bank.',
    image : standardChecking,
    options : {
      'interestRate' : '10%'
    }
  },
  {
    name : 'You Set Your Rate Savings',
    dis : 'With these kinds of savings you never lose with the Set Your Rate Savings you can set how much interest you want to make per year on your saving account.(amount must not be over 100%)',
    image : savings,
    options : {
      'interestRate' : '100%'
    }
  },
  {
    name : 'Business Checking',
    dis : 'Here at Dice Bank we support your gamble in building your own business, so we want to give back to you! When opening a Business Checking account we will match 25% of your initial deposit on us!',
    image : business,
    options : {
      promo : '25% init deposit'
    }
  }
]