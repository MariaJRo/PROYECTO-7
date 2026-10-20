const { isAuth, isAdmin } = require('../../middlewares/auth')
const {
  getUsers,
  register,
  login,
  putUser,
  deleteUser
} = require('../controllers/users')

const usersRouter = require('express').Router()

usersRouter.get('/', [isAdmin], getUsers)
usersRouter.post('/register', register)
usersRouter.post('/login', login)
usersRouter.put('/:id', [isAdmin], putUser)
usersRouter.delete('/:id', [isAuth], deleteUser)

module.exports = usersRouter
