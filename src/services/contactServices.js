const Contact = require('../schemas/contactsSchemas')

const listContacts = async () => {
  const result = await Contact.find()
  return result
}

const getContactById = async (contactId) => {
  const result = await Contact.findOne({ _id: contactId })
  return result
}

const addContact = async ({ name, email, phone, favorite }) => {
  const result = await Contact.create({ name, email, phone, favorite })
  return result
}

const updateContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true
  })
  return result
}

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove(contactId)
  return result
}

const updateStatusContact = async (contactId, { favorite }) => {
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  )
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
}
