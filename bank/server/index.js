const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, '../build')));


app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../build') });
})

app.post('/register', (req, res) => {

})

app.post('/login', (req, res) => {

})

app.get('/*', (req, res) => {
  res.redirect('/home')
})



app.listen(9999, () => console.log('server running on 9999'))