const express = require('express');
const controller = require('./post.controller');
const router = express.Router();

const middleware = require('../../auth/auth.middlewares');

router.get('/', controller.list());
router.post('/',
    middleware.isAdmin,
    controller.create
);

router.get('/:id', controller.findPost, controller.get);
router.delete('/:id',
    controller.findPost,
    middleware.isAdmin,
    controller.remove
);
router.patch('/:id',
    controller.findPost,
    middleware.isAdmin,
    controller.edit
);

module.exports = router;
