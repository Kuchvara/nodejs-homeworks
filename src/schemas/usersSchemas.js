const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')

const { Schema } = mongoose
const { subscriptionTypes } = require('../helpers/subscriptions')

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  subscription: {
    type: String,
    enum: [subscriptionTypes.STARTER, subscriptionTypes.PRO, subscriptionTypes.BUSINESS],
    default: subscriptionTypes.STARTER
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    default: function () {
      return gravatar.url(this.email, { s: '250' }, true)
    },
  },
})

userSchema.pre('save', async function () {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 9)
  }
})

userSchema.methods.validPassword = async function (password) {
  const result = await bcrypt.compare(password, this.password)
  return result
}

userSchema.path('email').validate(function (value) {
  const emailRegEx = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
  return emailRegEx.test(String(value).toLowerCase())
})

const User = mongoose.model('user', userSchema)

module.exports = User
