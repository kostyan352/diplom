const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()


app.use('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  next()
  })
app.use(express.json({ extended: true}))

app.use('/person', require('./api/routes/getperson'))

const PORT = config.get('port') || 5000


async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
       useNewUrlParser: true,
       useUnifiedTopology: true,
       useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`APP start on port ${PORT}...`))
  }  catch (e) {
      console.log('Server Error', e.message)
      process.exit(1)
  }
}

start()
