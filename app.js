const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()
const { errors } = require('./src/helpers/errors')

const contactsRouter = require('./src/routes/api/contacts')
const usersRouter = require('./src/routes/api/users')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static(process.env.PUBLIC_DIR))

app.use('/api/contacts', contactsRouter)
app.use('./api/users', usersRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use(errors)

module.exports = app
