const Contact = require('../model/contact');

const listContacts = async (page = 1, limit = 10, favorite = null) => {
  const contacts = await Contact.find({favorite})
  contacts.limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  const count = await Contact.countDocuments();
  return {
    contacts,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
};

const getContactById = async contactId => {
  const result = await Contact.findOne({ _id: contactId });
  return result;
};

const removeContact = async contactId => {
  const result = await Contact.findOneAndRemove({ _id: contactId });
  return result;
};

const addContact = async body => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { ...body },
    { upsert: true, returnDocument: 'after' },
  );
  return result;
};

const updateStatusContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite: body },
    { returnDocument: 'after' },
  );
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
