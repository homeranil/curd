const express = require('express');
const controller = require('./project.controller');
const router = express.Router();

const middleware = require('../../auth/auth.middlewares');

router.get('/', controller.list);
router.post('/',
    middleware.isLoggedIn,
    middleware.isAdmin,
    controller.create
);

router.get('/:id', controller.findProject, controller.get);
router.delete('/:id',
    controller.findProject,
    middleware.isLoggedIn,
    middleware.isAdmin,
    controller.remove
);
router.patch('/:id',
    controller.findProject,
    middleware.isLoggedIn,
    middleware.isAdmin,
    controller.edit
);

module.exports = router;
