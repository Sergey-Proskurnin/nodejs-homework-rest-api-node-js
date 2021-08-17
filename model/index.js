const fs = require('fs/promises');
const path = require('path');
const { v4: uuid } = require('uuid');

const filePath = path.join(__dirname, 'contacts.json');
// const contacts = require('./contacts.json')

const readContacts = async () => {
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
};

const listContacts = async () => {
  return await readContacts();
};

const getContactById = async contactId => {
  const data = await readContacts();
  const result = data.filter(contact => contact.id === +contactId)
  return result

};

const removeContact = async contactId => {
  const data = await readContacts();
  const result = data.filter(contact => contact.id !== +contactId)
  await fs.writeFile(filePath, JSON.stringify(result, null, 2));

};

const addContact = async body => {
  const id = uuid();
  const record = {
    id,
    ...body,
    ...(body.isVaccinated ? {} : { isVaccinated: false }),
  };
  const data = await readContacts();
  data.push(record);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  return record;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
