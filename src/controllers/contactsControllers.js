const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
} = require('../services/contactServices')

const getAllContacts = async (req, res) => {
  const contacts = await listContacts()
  res.status(200).json({ contacts, status: 'success' })
}

const getContactByIdentification = async (req, res) => {
  const contact = await getContactById(req.params.contactId)

  if (!contact) {
    return res.status(404).json({ message: 'Not found' })
  }

  res.status(200).json({ contact, status: 'success' })
}

const addNewContact = async (req, res) => {
  const contact = await addContact(req.body)
  res.status(201).json({ contact, status: 'success' })
}

const changeContact = async (req, res) => {
  const contact = await updateContact(req.params.contactId, req.body)

  if (!contact) {
    return res.status(404).json({ message: 'Not found' })
  }

  res.status(200).json({ contact, status: 'success' })
}

const deleteContact = async (req, res) => {
  const result = await removeContact(req.params.contactId)

  if (!result) {
    return res.status(404).json({ message: 'Not found' })
  }

  res.status(200).json({ message: 'contact deleted' })
}

const addContactToFavorite = async (req, res) => {
  const contact = await updateStatusContact(req.params.contactId, req.body)

  if (!contact) {
    return res.status(404).json({ message: 'Not found' })
  }

  res.status(200).json({ contact, status: 'success' })
}

module.exports = {
  getAllContacts,
  getContactByIdentification,
  addNewContact,
  changeContact,
  deleteContact,
  addContactToFavorite
}
