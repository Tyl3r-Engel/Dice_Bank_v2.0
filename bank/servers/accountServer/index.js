const express = require('express')
const path = require('path')
const cors = require('cors')
const verifyJWT = require('../middleware/verifyJWT')
const cookieParser = require('cookie-parser')
const app = express()
require('../../dataBase/pool')

const whiteList = ['http://localhost:3000']
const corsOptions = {
  origin : (origin, callback) => whiteList.indexOf(origin) !== -1 ? callback(null, true) : callback(new Error('Blocked by CORS'), null),
  optionsSuccessStatus : 200,
  credentials : true
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, '../../build')));

app.use(verifyJWT)

app.use('/dashBoard', require('./routes/dashBoard'))
app.use('/accountTransactions/:accountNumber-:id', require('./routes/accountTransactions'))
app.use('/recentTransactions/:accountNumbers', require('./routes/recentTransactions'))
app.use('/toggleAccountStatus/:accountNumber-:id', require('./routes/toggleAccountStatus'))
app.use('/deleteAccount/:accountNumber-:id', require('./routes/deleteAccount'))
app.use('/accountNameChange/:accountNumber-:id', require('./routes/accountNameChange'))
app.use('/accountSignUp', require('./routes/accountSignUp'))
app.use('/transfer', require('./routes/transfer'))




app.listen(7777, () => console.log('server running on 7777'))