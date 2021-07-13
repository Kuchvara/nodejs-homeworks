const Joi = require('joi')

const schemaAddContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    })
    .required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
})

const schemaPatchContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    })
    .optional(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .optional()
}).min(1)

const validate = (schema, res, obj, next) => {
  const validationLogs = schema.validate(obj)

  if (validationLogs.error) {
    return res
      .status(400)
      .json({ message: validationLogs.error.message.replace(/"/g, '') })
  }

  next()
}

module.exports = {
  addContactValidation: (req, res, next) => {
    return validate(schemaAddContact, res, req.body, next)
  },
  patchContactValidation: (req, res, next) => {
    return validate(schemaPatchContact, res, req.body, next)
  }
}
