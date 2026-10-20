require('dotenv').config()
const express = require('express')
const { connectDB } = require('./src/config/db')
const destinationsRouter = require('./src/api/routes/destinations')
const tripsRouter = require('./src/api/routes/trips')
const usersRouter = require('./src/api/routes/users')

const app = express()
app.use(express.json())

connectDB()

app.use('/api/v1/trips', tripsRouter)
app.use('/api/v1/destinations', destinationsRouter)
app.use('/api/v1/users', usersRouter)

app.use((req, res, next) => {
  return res.status(404).json('Route not found')
})

app.listen(3000, () => {
  console.log('Server deployed on: http://localhost:3000')
})
