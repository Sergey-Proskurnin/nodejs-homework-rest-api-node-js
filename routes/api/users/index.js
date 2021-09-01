const express = require('express');
const router = express.Router();

// const {
//   validationCreateContact,
//   validationUpdateContact,
//   validationUpdateStatusContact,
//   validateMongoId,
// } = require('./validation');

const { users: ctrl } = require('../../../controllers');

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.post('/logout', ctrl.logout);

module.exports = router;
