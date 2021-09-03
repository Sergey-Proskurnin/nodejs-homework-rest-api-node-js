const {
  HttpCode: { OK },
} = require('../../helpers');

const current = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    return res.status(OK).json({
      status: 'success',
      code: OK,
      user: { email, subscription },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = current;
