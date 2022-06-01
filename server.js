const path = require('path')

const express = require('express')
const app = express()

app.use(express.static('./'))
//app.use('/shaders',express.static('shaders'))
//app.use('/scripts',express.static('scripts'))
//app.use(express.static('dist'))

app.get('/', function (req, res) {
  res.sendFile(path.resolve('./index.html'))
})

app.listen(3000)