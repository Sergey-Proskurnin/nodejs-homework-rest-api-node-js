const db = require('./db');
const { ObjectId } = require('mongodb');

const getCollection = async (db, name) => {
  const client = await db;
  const collection = await client.db().collection(name);
  return collection;
};

const listContacts = async () => {
  const collection = await getCollection(db, 'contacts');
  const result = await collection.find({}).toArray();
  return result;
};

const getContactById = async contactId => {
  const collection = await getCollection(db, 'contacts');
  const objId = new ObjectId(contactId);
  const [result] = await collection.find({ _id: objId }).toArray();
  return result;
};

const removeContact = async contactId => {
  const collection = await getCollection(db, 'contacts');
  const objId = new ObjectId(contactId);
  const { value: result } = await collection.findOneAndDelete({ _id: objId });
  return result;
};

const addContact = async body => {
  const collection = await getCollection(db, 'contacts');
  const record = {
    ...body,
  };
  const { insertedId } = await collection.insertOne(record);
  const [result] = await collection.find({ _id: insertedId }).toArray();
  return result;
};

const updateContact = async (contactId, body) => {
  const collection = await getCollection(db, 'contacts');
  const objId = new ObjectId(contactId);
  const { value: result } = await collection.findOneAndUpdate(
    { _id: objId },
    { $set: body },
    { upsert: true, returnDocument: 'after' },
  );
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
