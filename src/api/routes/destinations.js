const { isAuth, isAdmin } = require('../../middlewares/auth')

const {
  getDestinations,
  getDestinationsAdmin,
  getDestinationById,
  getDestinationsByCategory,
  postDestination,
  putDestination,
  deleteDestination
} = require('../controllers/destinations')

const destinationsRouter = require('express').Router()

destinationsRouter.get('/not-verified', [isAdmin], getDestinationsAdmin)
destinationsRouter.get('/category/:category', getDestinationsByCategory)
destinationsRouter.get('/:id', getDestinationById)
destinationsRouter.get('/', getDestinations)
destinationsRouter.post('/', [isAuth], postDestination)
destinationsRouter.put('/:id', [isAdmin], putDestination)
destinationsRouter.delete('/:id', [isAdmin], deleteDestination)

module.exports = destinationsRouter
