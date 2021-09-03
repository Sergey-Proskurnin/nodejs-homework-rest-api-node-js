const Joi = require('joi');

const {
  HttpCode: { BAD_REQUEST },
  validate,
} = require('../../../helpers');

const schemaPаramsrUser = Joi.object({
  password: Joi.string()
    .pattern(
      /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/,
    )
    .required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: false }).required(),
  subscription: Joi.string().optional(),
});

module.exports = {
  validationPаramsUser: (req, res, next) => {
    if ('password' in req.body && 'email' in req.body) {
      return validate(schemaPаramsrUser, req.body, next);
    }
    return res.status(BAD_REQUEST).json({
      status: 'error',
      code: BAD_REQUEST,
      message: 'Missing required name field',
    });
  },
};
