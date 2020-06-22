const express = require('express');
const upload = require('../../plugins/multer');

const router = express.Router();

router.post('/upload',upload.upload.single('image'), async (req, res, next) => {
    const image = req.file;
    res.json(image);
});

module.exports = router;
