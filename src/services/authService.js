const {
  findUserByEmail,
  updateToken
} = require('./userService')
const jwt = require('jsonwebtoken')

const JWT_KEY = process.env.JWT_KEY

const login = async ({ email, password }) => {
  const user = await findUserByEmail(email)
  const isValidPassword = await user?.validPassword(password)

  if (!user || !isValidPassword) {
    return null
  }

  const id = user.id
  const payload = { id }
  const token = jwt.sign(payload, JWT_KEY, { expiresIn: '2h' })

  await updateToken(id, token)
  return token
}

const logout = async (id) => {
  const data = await updateToken(id, null)
  return data
}

module.exports = {
  login,
  logout,
}
