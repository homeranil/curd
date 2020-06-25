const express = require('express');
const controller = require('./tags.controller');
const router = express.Router();
const middleware = require('../../auth/auth.middlewares');
const validator = require('./tags.validator');


router.get('/', controller.list());
router.post('/',
    middleware.isAdmin,
    validator.validateAddTag,
    controller.create('title')
);

module.exports = router;
