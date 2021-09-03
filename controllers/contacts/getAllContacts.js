// const Contacts = require('../../repositories/contacts');
const Contact = require('../../model/contact');


const {
  HttpCode: { OK },
 } = require('../../helpers');

const getAllContacts = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query
  try {
    const contacts = await Contact.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();
    
    const count = await Contact.countDocuments();
    ;
    return res
      .status(OK)
      .json({ status: 'success', code: OK, data: { contacts, totalPages: Math.ceil(count / limit),
        currentPage: page } });
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
