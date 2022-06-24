const express = require('express')
const path = require('path')
const cors = require('cors')
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')
const app = express()
require('../dataBase/pool')

const whiteList = ['http://localhost:3000']
const corsOptions = {
  origin : '*', //(origin, callback) => whiteList.indexOf(origin) !== -1 ? callback(null, true) : callback(new Error('Blocked by CORS'), null),
  optionsSuccessStatus : 200
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, '../build')));
// app.get('*', (req, res) => {
//  res.sendFile(path.join(__dirname, './pageNotFound.html'))
// })

app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))

app.use(verifyJWT)

app.get('/dashBoard', (req, res) => {
  console.log(req.body)
  res.json('yayayay').end()
})



app.listen(9999, () => console.log('server running on 9999'))