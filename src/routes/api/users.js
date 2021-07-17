const express = require('express')
const router = express.Router()

const {
  registration,
  loginController,
  logoutController,
  currentUser,
  subscription
} = require('../../controllers/usersControllers')

const { userValidation, subscriptionValidation } = require('../../middleware/userValidationMid')
const { protection } = require('../../middleware/passwordMid')
const { asyncWrapper } = require('../../helpers/asyncWrapper')

router.post('/signup', userValidation, asyncWrapper(registration))
router.post('/login', userValidation, asyncWrapper(loginController))
router.post('/logout', protection, asyncWrapper(logoutController))
router.get('/current', protection, asyncWrapper(currentUser))
router.patch('/subscription', protection, subscriptionValidation, asyncWrapper(subscription))

module.exports = router
