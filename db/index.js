const mongoose = require('mongoose')

const URI = process.env.DB_URL

const db = async () => {
  return await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
}

mongoose.connection.on('connected', (_) => {
  console.log('Database connection successful')
})

mongoose.connection.on('error', (err) => {
  console.error(`Database connection error: ${err.message}`)
})

mongoose.connection.on('disconnect', (_) => {
  console.log('Database disconnected')
})

process.on('SIGINT', async () => {
  console.log('Database disconnected and app terminated')
  process.exit(1)
})

module.exports = db
