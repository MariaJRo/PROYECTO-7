const { generateSign } = require('../../config/jwt')
const User = require('../models/users')
const bcrypt = require('bcrypt')

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const register = async (req, res, next) => {
  try {
    const newUser = new User({
      userName: req.body.userName,
      password: req.body.password,
      rol: 'user'
    })

    const duplicatedUser = await User.findOne({ userName: req.body.userName })

    if (duplicatedUser) {
      return res
        .status(400)
        .json('Username unavailable. Choose another username, mate')
    }
    const userSaved = await newUser.save()
    return res.status(201).json(userSaved)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName })
    if (!user) {
      return res.status(204).json('Non-existing user')
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      //return res.status(200).json('Hemos hecho login')
      const token = generateSign(user._id)
      return res.status(200).json({ user, token })
    } else {
      return res.status(400).json('Incorrect username or password')
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

const putUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const { rol } = req.body

    if (!['user', 'admin'].includes(rol)) {
      return res.status(400).json('Invalid role')
    }

    const userUpdated = await User.findByIdAndUpdate(
      id,
      { rol },
      { new: true, runValidators: true }
    )

    if (!userUpdated) {
      return res.status(404).json('User not found')
    }

    return res.status(200).json(userUpdated)
  } catch (error) {
    return res.status(400).json('Error updating user')
  }
}

const deleteUser = async (req, res, next) => {
  if (req.user.rol === 'user' && req.user._id.toString() !== req.params.id) {
    return res.status(401).json('You can only delete your own account, mate')
  }
  try {
    const { id } = req.params
    const userDeleted = await User.findByIdAndDelete(id)
    return res.status(200).json(userDeleted)
  } catch (error) {
    return res.status(400).json('Error deleting user')
  }
}
module.exports = { getUsers, register, login, putUser, deleteUser }
