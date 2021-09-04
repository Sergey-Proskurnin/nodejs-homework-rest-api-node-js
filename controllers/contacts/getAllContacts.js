const Contacts = require('../../repositories/contacts');

const {
  HttpCode: { OK },
} = require('../../helpers');

const getAllContacts = async (req, res, next) => {
  const { page, limit, favorite } = req.query;
  try {
    const contacts = await Contacts.listContacts(page, limit, favorite );
    return res.status(OK).json({
      status: 'success',
      code: OK,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
