const Contacts = require('../../repositories/contacts');
const { OK, NOT_FOUND } = require('../../helpers');

const updateStatusContact = async (req, res, next) => {
  try {
    const contact = await Contacts.updateStatusContact(
      req.params.contactId,
      req.body.favorite,
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

module.exports = updateStatusContact;
