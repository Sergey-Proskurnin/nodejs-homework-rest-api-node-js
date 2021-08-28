const Contacts = require('../../repositories/contacts');
const { HttpCode: { CREATED }  } = require('../../helpers');

const addContact = async (req, res, next) => {
  try {
    const contacts = await Contacts.addContact(req.body);
    return res
      .status(CREATED)
      .json({ status: 'success', code: CREATED, data: { contacts } });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
