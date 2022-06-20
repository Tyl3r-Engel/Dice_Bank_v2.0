const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json())

app.get('/register', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../build') });
})

app.post('/register', (req, res) => {
  console.log(req.body)
  res.end()
})

app.post('/login', (req, res) => {
  console.log(req.body)
  res.end()
})




app.listen(9999, () => console.log('server running on 9999'))