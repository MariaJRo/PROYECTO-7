const jwt = require('jsonwebtoken')

//generar llave
const generateSign = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '4w' })
}

//comprobar si la llave es nuestra
const verifyJwt = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { generateSign, verifyJwt }
