const express = require('express');
const router = express.Router();
const cors = require('cors'); // cors middleware
const helmet = require('helmet'); // helmet - headers middleware
const morgan = require('morgan'); // morgan - logger middleware

router.use(require('../auth/auth.middlewares').checkTokenSetUser); // my custom auth middleware
router.use(require('./lang')); // detect lang middleware

// use all npm middlewares
router.use(cors());
router.use(helmet());
router.use(morgan('dev'));
router.use(express.json());

module.exports = router;
