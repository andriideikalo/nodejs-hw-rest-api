const fs = require("fs/promises");
const path = require("path");
const uniqid = require("uniqid");
const contactsPath = path.join(__dirname, "contacts.json");

async function updateContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(({ id }) => id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(idx, 1);
  updateContacts(contacts);
  return removeContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: uniqid(), ...body };
  contacts.push(newContact);
  updateContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(({ id }) => id === contactId);
  if (idx === -1) {
    return null;
  }
  const updContact = contacts[idx];
  contacts[idx] = { ...updContact, ...body };
  updateContacts(contacts);
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
