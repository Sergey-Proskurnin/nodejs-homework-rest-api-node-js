const Contacts = require('../../repositories/contacts');
const {
  HttpCode: { OK },
} = require('../../helpers');

const getAllContacts = async (_req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res
      .status(OK)
      .json({ status: 'success', code: OK, data: { contacts } });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
