const express = require('express');

const controller = require('./auth.controller');
const middlewares = require('./auth.middlewares');
const validator = require('./auth.validator');

const router = express.Router();

router.post('/login', controller.login);
router.get('/me', middlewares.isLoggedIn, controller.me);
router.post('/signup', middlewares.isGuest, validator.validateSignUpUser ,controller.signup);

module.exports = router;
