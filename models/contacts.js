const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid")

const contactsPath = path.join(__dirname, "./contacts.json")

const allContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  return JSON.parse(data);
}

const getContactById = async (id) => {    
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);

  const contact = contacts.find(item => item.id === id);

  return contact || null;
}

const deleteContact = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);

  const newContact = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContact, null, 2));
  return newContact;

}

const addContact = async ({name, email, phone}) => {    
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  contacts.push({
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  });

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts;

}

const updateContact = async(id, {name, email, phone}) => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);

  const contactIndex = contacts.findIndex(item => item.id === id);
  if(contactIndex === -1){
    return null;
  }
  contacts[contactIndex] = {id, name, email, phone};
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[contactIndex];

}

module.exports = {
  allContacts,
  getContactById,
  deleteContact,
  addContact, 
  updateContact,
}
