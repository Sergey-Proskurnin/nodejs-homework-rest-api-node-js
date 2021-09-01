const Users = require('../../repositories/users');

const {
  HttpCode: { CREATED, CONFLICT },
} = require('../../helpers');

const register = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);

    if (user) {
      return res.status(CONFLICT).json({
        status: 'error',
        code: CONFLICT,
        message: 'Email is already used',
      });
    }
    const { id, email, subscription } = await Users.create(req.body);
    return res
      .status(CREATED)
      .json({
        status: 'success',
        code: CREATED,
        data: { id, email, subscription },
      });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
