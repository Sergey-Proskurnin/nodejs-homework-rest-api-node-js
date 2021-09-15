const Users = require('../../repositories/users');
const EmailService = require('../../services/email');
const {
  //   CreateSenderSendGrid,
  CreateSenderNodemailer,
} = require('../../services/email-sender');
const {
  HttpCode: { OK, CONFLICT, NOT_FOUND },
} = require('../../helpers');

const repeatEmailVerify = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);
    if (user) {
      const { email, verify, verifyToken } = user;
      if (!verify) {
        const emailService = new EmailService(
          process.env.NODE_ENV,
          new CreateSenderNodemailer(),
        );
        await emailService.sendVerifyEmail(verifyToken, email);
        return res.status(OK).json({
          status: 'success',
          code: OK,
          data: { message: 'Resabmitted verification success' },
        });
      }
      return res.status(CONFLICT).json({
        status: 'error',
        code: CONFLICT,
        message: 'Email has been verified',
      });
    }
    return res
      .status(NOT_FOUND)
      .json({ status: 'error', code: NOT_FOUND, message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

module.exports = repeatEmailVerify;
