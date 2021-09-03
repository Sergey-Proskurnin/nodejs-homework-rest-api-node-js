// const Users = require('../../repositories/users');
const {
  HttpCode: {
    //  UNAUTHORIZED,
      OK },
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
// const current = async (req, res, next) => {
//   try {
//     const id = req.user.id;
//     const { email, subscription } = req.user;
//     const currentUser = await Users.findById(id);
//     if (!currentUser) {
//       return res.status(UNAUTHORIZED).json({
//         status: 'error',
//         code: UNAUTHORIZED,
//         message: 'Not authorized',
//       });
//     }
//     return res.status(OK).json({
//       status: 'success',
//       code: OK,
//       user: { email, subscription },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = current;
