const Contacts = require('../../repositories/contacts');
const  { HttpCode: { OK, NOT_FOUND }, } = require('../../helpers');

const updateContact = async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body,
    );
    if (contact) {
      return res
        .status(OK)
        .json({ status: 'success', code: OK, data: { contact } });
    }
    return res
      .status(NOT_FOUND)
      .json({ status: 'error', code: NOT_FOUND, message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
