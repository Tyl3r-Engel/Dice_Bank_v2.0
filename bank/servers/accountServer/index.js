const express = require('express')
const path = require('path')
const cors = require('cors')
const verifyJWT = require('../middleware/verifyJWT')
const cookieParser = require('cookie-parser')
const app = express()
const manageAccounts = require('./manageAccounts')

const corsOptions = {
  origin : '*',
  optionsSuccessStatus : 200,
  credentials : true
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, '../../build')));

app.use('/checkingAndSavings', express.static(path.join(__dirname, '../../build')));
app.use('/creditCard', express.static(path.join(__dirname, '../../build')));
app.use('/loan', express.static(path.join(__dirname, '../../build')));
app.use('/trading', express.static(path.join(__dirname, '../../build')));
app.use('/register', (req, res, next) => {
  if(req.cookies.jwt) {
    return res.redirect('/')
  }
  next()
}, express.static(path.join(__dirname, '../../build')));

app.use(verifyJWT)
app.use('/dashBoard', require('./routes/dashBoard'))
app.use('/accountTransactions/:accountNumber-:id', require('./routes/accountTransactions'))
app.use('/recentTransactions/:accountNumbers', require('./routes/recentTransactions'))
app.use('/toggleAccountStatus/:accountNumber-:id', require('./routes/toggleAccountStatus'))
app.use('/deleteAccount/:accountNumber-:id', require('./routes/deleteAccount'))
app.use('/accountNameChange/:accountNumber-:id', require('./routes/accountNameChange'))
app.use('/accountSignUp', require('./routes/accountSignUp'))
app.use('/transfer', require('./routes/transfer'))
app.use('/accountDelete', require('./routes/accountDelete'))

app.use('/viewAccount', express.static(path.join(__dirname, '../../build')))
app.use('/transfer', express.static(path.join(__dirname, '../../build')))
app.use('/accountSignUp', express.static(path.join(__dirname, '../../build')))

app.use('*', (req, res) => res.redirect('/'))

app.listen(7777, () => {
  console.log('server running on 7777')
  manageAccounts()
})