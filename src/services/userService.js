const User = require('../schemas/usersSchemas')
const { nanoid } = require('nanoid')
const { sendEmail } = require('./emailService')

const addUser = async (body) => {
  const verifyToken = nanoid()
  const { email } = body

  await sendEmail(verifyToken, email)

  const user = await new User({ ...body, verifyToken })
  return user.save()
}

const findUserById = async (id) => {
  const user = await User.findById(id)
  return user
}

const findUserByEmail = async (email) => {
  const user = await User.findOne({ email })
  return user
}

const updateToken = async (id, token) => {
  await User.updateOne({ _id: id }, { token })
}

const updateSubscription = async (id, subscription) => {
  const user = await User.findOneAndUpdate({ _id: id }, { subscription }, { new: true })
  return user
}

const updateAvatar = async (id, url) => {
  const { avatarURL } = await User.findOneAndUpdate({ _id: id }, { avatarURL: url }, { new: true })
  return avatarURL
}

const verify = async (token) => {
  const user = await User.findOne({ verifyToken: token })

  if (user) {
    await user.updateOne({ verify: true, verifyToken: null })
    return true
  }
}

const reVerify = async (email) => {
  const user = await User.findOne({ email, verify: false })

  if (user) {
    await sendEmail(user.verifyToken, email)
    return true
  }
}

module.exports = {
  findUserById,
  findUserByEmail,
  addUser,
  updateToken,
  updateSubscription,
  updateAvatar,
  verify,
  reVerify
}
