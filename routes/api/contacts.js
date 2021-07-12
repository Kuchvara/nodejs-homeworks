const express = require('express')
const router = express.Router()

const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../model/index')

const {
  addContactValidation,
  patchContactValidation
} = require('../../middleware/validationMiddleware')

router.get('/', async (req, res, next) => {
  try {
    const contactsList = await listContacts()
    return res.json({
      status: 'success',
      code: 200,
      contactsList
    })
  } catch (err) {
    next(err)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId)
    if (!contact) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found'
      })
    }
    res.json({
      status: 'success',
      code: 200,
      contact
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', addContactValidation, async (req, res, next) => {
  try {
    const contact = await addContact(req.body)

    res.status(201).json({ contact, status: 'success' })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId)

    if (!contact) {
      return res.status(404).json({ message: 'Not found' })
    }
    res.status(200).json({ message: `Contact with id '${req.params.contactId}' deleted` })
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId', patchContactValidation, async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body)

    if (!contact) {
      return res.status(404).json({ message: 'Not found' })
    }
    res.status(200).json({ contact, status: 'success' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
