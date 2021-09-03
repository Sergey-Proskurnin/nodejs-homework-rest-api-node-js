const express = require('express');
const router = express.Router();
const guard = require('../../../helpers/guard');

const { validationPаramsUser } = require('./validation');

const { users: ctrl } = require('../../../controllers');

router.post('/signup', validationPаramsUser, ctrl.register);
router.post('/login', validationPаramsUser, ctrl.login);
router.post('/logout', guard, ctrl.logout);
router.get('/current', guard, ctrl.current);

module.exports = router;
