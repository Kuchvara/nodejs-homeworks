const express = require('express')
const router = express.Router()

const {
  registration,
  loginController,
  logoutController,
  currentUser,
  subscription,
  avatarController,
  verificationController,
  reVerificationController
} = require('../../controllers/usersControllers')

const { userValidation, subscriptionValidation, verificationValidation } = require('../../middleware/userValidationMid')
const { protection } = require('../../middleware/passwordMid')
const { asyncWrapper } = require('../../helpers/asyncWrapper')
const upload = require('../../helpers/uploadings')

router.post('/signup', userValidation, asyncWrapper(registration))
router.get('/verify/:verificationToken', asyncWrapper(verificationController))
router.post('/verify/', verificationValidation, asyncWrapper(reVerificationController))
router.post('/login', userValidation, asyncWrapper(loginController))
router.post('/logout', protection, asyncWrapper(logoutController))
router.get('/current', protection, asyncWrapper(currentUser))
router.patch('/subscription', protection, subscriptionValidation, asyncWrapper(subscription))
router.patch('/avatars', protection, upload.single('avatar'), asyncWrapper(avatarController))

module.exports = router
