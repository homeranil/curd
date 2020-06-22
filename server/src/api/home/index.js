const express = require('express');

const posts = require('../posts/post.controller');
const projects = require('../projects/project.controller');

const router = express.Router();

const limitProjects = process.env.HOME_LIMIT_PROJECTS || 6;
const limitPosts = process.env.HOME_LIMIT_POSTS || 6;

router.get('/',
    projects.list(false, limitProjects),
    posts.list(false, limitPosts),
    async (req, res) => {
        res.json({
            projects: res.projects,
            posts: res.posts
        });
    });

module.exports = router;
