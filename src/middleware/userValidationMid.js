const Joi = require('joi')
const { subscriptionTypes } = require('../helpers/subscriptions')

const userSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    })
    .required(),
  password: Joi.string()
    .pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/)
    .required(),
  subscription: Joi.string().default(subscriptionTypes.STARTER),
})

const subscriptionSchema = Joi.object({
  subscription: Joi.any()
    .valid(subscriptionTypes.STARTER, subscriptionTypes.PRO, subscriptionTypes.BUSINESS)
    .required(),
})

const schemaUserVerification = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    })
    .required(),
})

const validate = (schema, res, req, next) => {
  const validationBody = schema.validate(req.body)

  if (validationBody.error) {
    return res.status(400).json({ message: validationBody.error.message.replace(/"/g, '') })
  }
  next()
}

module.exports = {
  userValidation: (req, res, next) => {
    return validate(userSchema, res, req, next)
  },
  subscriptionValidation: (req, res, next) => {
    return validate(subscriptionSchema, res, req, next)
  },
  verificationValidation: (req, res, next) => {
    return validate(schemaUserVerification, res, req, next)
  }
}
