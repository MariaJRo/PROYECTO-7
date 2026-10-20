const { isAuth, isAdmin } = require('../../middlewares/auth')

const {
  getTrips,
  getTripsAdmin,
  getTripById,
  postTrip,
  putTrip,
  deleteTrip
} = require('../controllers/trips')

const tripsRouter = require('express').Router()

tripsRouter.get('/not-verified', [isAdmin], getTripsAdmin)
tripsRouter.get('/:id', getTripById)
tripsRouter.get('/', getTrips)
tripsRouter.post('/', [isAuth], postTrip)
tripsRouter.put('/:id', [isAdmin], putTrip)
tripsRouter.delete('/:id', [isAdmin], deleteTrip)

module.exports = tripsRouter
