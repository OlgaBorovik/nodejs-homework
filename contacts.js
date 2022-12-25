const fs = require("fs/promises")
const path = require("path")
const { nanoid } = require("nanoid")

  const contactsPath = path.resolve(__dirname, "db", "contacts.json") ;
 
async function readContacts() {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data);
  return contacts
}  

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
}

async function listContacts() {
  const contacts = readContacts()
  return contacts
}

async function getContactById(contactId) {
  const contacts = await readContacts()
  const result = contacts.find(item => item.id === contactId)
  if (!result) {
    return null
  }
  return result
}

async function removeContact(contactId) {
  const contacts = await readContacts()
  const updatedContacts = contacts.filter(item => item.id !== contactId)
  await writeContacts(updatedContacts)
  console.table(updatedContacts)
  return updatedContacts
}

async function addContact( name, email, phone ) {
  const id = nanoid(3)
  const newContact = { id, name, email, phone }
  const contacts = await readContacts()
  contacts.push(newContact)
  await writeContacts(contacts)
  return newContact
}



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}