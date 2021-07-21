const fs = require('fs').promises
const path = require('path')

const { addUser, findUserById, findUserByEmail, updateSubscription, updateAvatar, verification, reVerification } = require('../services/userService')
const { login, logout } = require('../services/authService')
const { avatarEdit } = require('../helpers/avatars')

const AVATARS_DIR = path.join(process.cwd(), process.env.PUBLIC_DIR, process.env.USERS_AVATARS)

const registration = async (req, res) => {
  const user = await findUserByEmail(req.body.email)

  if (user) {
    return res.status(409).json({ message: 'Email in use' })
  }

  const { email, subscription } = await addUser(req.body)
  res.status(201).json({ user: { email, subscription } })
}

const loginController = async (req, res) => {
  const token = await login(req.body)

  if (token) {
    const { email, subscription } = await findUserByEmail(req.body.email)
    return res.status(200).json({ token, user: { email, subscription } })
  }

  res.status(401).json({ message: 'Email or password is wrong' })
}

const logoutController = async (req, res) => {
  await logout(req.user.id)
  res.status(204).json({ message: 'No Content' })
}

const currentUser = async (req, res) => {
  const currentUser = await findUserById(req.user.id)

  if (currentUser) {
    const { email, subscription } = currentUser
    res.status(200).json({ email, subscription })
  }
}

const subscription = async (req, res) => {
  const result = await updateSubscription(req.user.id, req.body.subscription)

  if (result) {
    const { email, subscription } = result
    res.status(200).json({ user: { email, subscription }, status: 'updated' })
  }
}

const avatarController = async (req, res) => {
  const filePath = req.file.path
  const fileName = req.file.filename

  if (req.file) {
    await avatarEdit(filePath)
    await fs.rename(filePath, path.join(AVATARS_DIR, fileName))

    const newAvatarUrl = `${req.protocol}://${req.headers.host}/${process.env.USERS_AVATARS}/${fileName}`

    const url = await updateAvatar(req.user.id, newAvatarUrl)
    return res.status(200).json({ avatarURL: url })
  }

  res.status(400).json({ message: 'Please, provide correct file' })
}

const verificationController = async (req, res) => {
  const result = await verification(req.params.verificationToken)

  if (result) {
    return res.status(200).json({ message: 'Verification successful' })
  }

  res.status(404).json({ message: 'User not found' })
}

const reVerificationController = async (req, res) => {
  const result = await reVerification(req.body.email)

  if (result) {
    return res.status(200).json({ message: 'Verification email sent' })
  }

  res.status(400).json({ message: 'Verification has already been passed' })
}

module.exports = {
  registration,
  loginController,
  logoutController,
  currentUser,
  subscription,
  avatarController,
  verificationController,
  reVerificationController
}
