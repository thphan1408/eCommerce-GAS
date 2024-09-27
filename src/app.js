const express = require('express')
const morgan = require('morgan')
const { default: helmet } = require('helmet')
const compression = require('compression')

const app = express()

/**
 * init middlewares
 */
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())

/**
 * init db
 */
require('./db/init.mongodb')
const { checkOverload } = require('./helpers/check.connect')
checkOverload()

/**
 * init routes
 */

app.get('/', (req, res) => {
  const largeText = 'Hello World! '.repeat(100000) // Tạo một chuỗi lớn để thử nghiệm nén
  return res.status(200).json({ message: 'Hello World', largeText: largeText })
})

/**
 * handle errors
 */

module.exports = app
