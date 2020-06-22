const express = require('express');
const upload = require('../../plugins/multer');

const Gallery = require('./gallery.model');

const router = express.Router();

router.post('/upload',upload.upload.single('image'), async (req, res, next) => {
    const image = req.file;
    try {
        const newGallery = new Gallery(image);
        const createdEntry = await newGallery.save();
        res.status(200).json(createdEntry);
    }
    catch (error) {
        res.status(500);
        next(error);
    }
});

module.exports = router;
