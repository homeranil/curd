const express = require('express');

const controller = require('./auth.controller');
const middlewares = require('./auth.middlewares');

const router = express.Router();

const defaultLoginError = 'Unable to login';
const signInError = 'That username is not unique. Please choose another one.';
const signUpEmailError = 'That email is not unique. Please choose another one.';

router.get('/', controller.get);
router.get('/me', middlewares.isLoggedIn, controller.me);
router.post(
    '/signup',
    middlewares.validateUser(),
    middlewares.findUser(signInError, (user) => user, 422),
    middlewares.findUserEmail(signUpEmailError, (user) => user, 422),
    controller.signup
);
router.post(
    '/login',
    middlewares.validateUser(defaultLoginError),
    middlewares.findUser(defaultLoginError, (user) => !(user && user.active)),
    controller.login
);

module.exports = router;
