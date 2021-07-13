const fs = require('fs/promises')
const path = require('path')

const contacts = path.join(__dirname, 'contacts.json')

const { customAlphabet } = require('nanoid')
const newId = customAlphabet('1234567890', 10)

const listContacts = async () => {
  try {
    const data = await fs.readFile(contacts, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    console.error(err)
  }
}
console.log(listContacts)

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contacts, 'utf8')
    const contact = JSON.parse(data).find(el => el.id === Number(contactId))
    return contact
  } catch (err) {
    console.error(err)
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contacts, 'utf8')
    const newContacts = JSON.parse(data).filter(el => el.id !== Number(contactId))

    await fs.writeFile(contacts, JSON.stringify(newContacts), 'utf8')
    return (`Contact with id '${contactId}' deleted`)
  } catch (err) {
    console.error(err)
  }
}

const addContact = async (body) => {
  const { name, email, phone } = body

  const newContact = {
    id: Number(newId()),
    name,
    email,
    phone
  }
  try {
    const data = await fs.readFile(contacts, 'utf8')
      .then(data => JSON.parse(data))

    data.push(newContact)

    await fs.writeFile(contacts, JSON.stringify(data), 'utf8')

    return data
  } catch (err) {
    console.error(err)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contacts, 'utf8')
      .then(data => JSON.parse(data))

    const findContact = data.find(
      (el) => el.id === Number(contactId)
    )
    const updatedContact = { ...findContact, ...body }
    const newContacts = data.map((item) =>
      item.id.toString() === contactId ? updatedContact : item
    )

    await fs.writeFile(contacts, JSON.stringify(newContacts), 'utf8')

    return updatedContact
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
