const fs = require('fs/promises');
const path = require("path");

const contactsRath = path.join(__dirname, "./contacts.json")

const listContacts = async () => {
  const data = await fs.readFile(contactsRath, "utf-8");
  const contacts = JSON.parse(data);
  console.log("List of contacts: ");
  console.table(contacts);
}

const getContactById = async (id) => {    
const data = await fs.readFile(contactsRath, "utf-8");
const contacts = JSON.parse(data);

const contact = contacts.find(item => item.id === id);
console.log(`Get contact by ID ${id}:`);
console.table(contact);
return contact || null;}

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsRath, "utf-8");
  const contacts = JSON.parse(data);

  const newContact = contacts.filter((contact) => contact.id !== contactId);
  console.log("Contact deleted successfully! New list of contacts: ");
  console.table(newContact);
}

const addContact = async (name, email, phone) => {    
const data = await fs.readFile(contactsRath, "utf-8");
const contacts = JSON.parse(data);
contacts.push({
    id: contacts.length + 1,
    name: name,
    email: email,
    phone: phone,
  });

  console.log(" New lists of contacts: ");
  console.table(contacts);}

const updateContact = async (id, data) => {
  const contactsId = String(id);
  const data = await fs.readFile(contactsRath, "utf-8");
const contacts = JSON.parse(data);

const contact = contacts.find(item => item.id === id);


}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
