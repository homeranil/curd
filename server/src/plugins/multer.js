const multer = require('multer');
const path = require('path');


const { v5:uuid } = require('uuid');

const uploadDir = process.env.UPLOAD_DIR || '../uploads/';
const uploadMax = process.env.UPLOAD_MAX_SIZE || 1;

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, path.join(__dirname, uploadDir));
    },
    filename: (req, file, cb) => {
        let name = new Date().getTime() + file.originalname;
        const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
        let ext = file.originalname.split('.');
        ext = ext[ext.length-1];
        name = uuid(name, MY_NAMESPACE) + '.' + ext;
        cb(null, name);
    }
});
const fileFilter = (req, file, cb) => {
    const allowTypes = [
        'image/jpeg',
        'image/png',
        'image/gif'
    ];
    if (allowTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error(`Sorry, you can't upload '${file.mimetype}' type.`));
    }
};
exports.upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * uploadMax
    },
    fileFilter
});
