const fs = require('fs')
const path = require('path')
const colors = require('colors')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('port', (process.env.PORT || 3000))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', express.static(path.resolve(__dirname, './public')))

app.listen(app.get('port'), () => console.log('Server started: ' + 'http://localhost:'.cyan + String(app.get('port')).cyan))
