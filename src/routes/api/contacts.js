const express = require('express')
const router = express.Router()
const { asyncWrapper } = require('../../helpers/asyncWrapper')
const { protection } = require('../../middleware/passwordMid')

const {
  getAllContacts,
  getContactByIdentification,
  addNewContact,
  changeContact,
  deleteContact,
  addContactToFavorite
} = require('../../controllers/contactsControllers')

const {
  addContactValidation,
  patchContactValidation,
  patchFavoriteValidation
} = require('../../middleware/contactValidationMid')

router.use(protection)

router.get('/', asyncWrapper(getAllContacts))
router.get('/:contactId', asyncWrapper(getContactByIdentification))
router.post('/', addContactValidation, asyncWrapper(addNewContact))
router.patch('/:contactId', patchContactValidation, asyncWrapper(changeContact))
router.patch('/:contactId/favorite', patchFavoriteValidation, asyncWrapper(addContactToFavorite))
router.delete('/:contactId', asyncWrapper(deleteContact))

module.exports = router
