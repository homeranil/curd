const express = require('express');

const posts = require('../posts/post.controller');
const projects = require('../projects/project.controller');

const router = express.Router();

router.get('/',
    projects.all,
    posts.all,
    async (req, res) => {
        res.json({
            projects: res.projects,
            posts: res.posts
        });
    });

module.exports = router;
