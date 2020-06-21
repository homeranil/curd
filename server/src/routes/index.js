const express = require('express');
const router = express.Router();

const auth = require('../auth/auth.routes');
const projects = require('../api/projects/project.routes');
const posts = require('../api/posts/post.routes');
const home = require('../api/home');


router.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    });
});

router.use(
    '/auth',
    auth
);

router.use(
    '/projects',
    projects
);

router.use(
    '/posts',
    posts
);

router.use(
    '/home',
    home
);

module.exports = router;
