const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    });
});

router.use('/auth', require('../auth/auth.routes'));

// auto load all .routes.js from api folders
const apiDir = path.join(__dirname, '../api/');
fs.readdirSync(apiDir).forEach(dir => {
    fs.readdirSync(path.join(apiDir, dir)).forEach(file => {
        if(file.includes('.routes')){
            router.use('/' + dir, require(path.join(apiDir, dir, file)));
        }
    });
});


router.use('/uploads', require('../middleware/requestImage'), express.static(path.join(__dirname, '../uploads/')));

module.exports = router;
