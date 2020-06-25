const express = require('express');
const router = express.Router();
const cors = require('cors'); // cors middleware
const helmet = require('helmet'); // helmet - headers middleware
const morgan = require('morgan'); // morgan - logger middleware
const cookieParser = require('cookie-parser');

const setCache = require('./setCache');

const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

router.use(require('../auth/auth.middlewares').checkTokenSetUser); // my custom auth middleware
router.use(require('./lang')); // detect lang middleware

// use all npm middlewares
router.use(cors());
router.use(helmet());
router.use(morgan('dev'));
router.use(express.json());
router.use(cookieParser());

router.use(setCache);

router.use(rateLimit({
    windowMs: (process.env.RATE_LIMIT_SEC || 30) * 1000,
    max: process.env.RATE_LIMIT_MAX || 5,
    handler: function (req, res, next) {
        console.log(process.env.RATE_LIMIT_SEC);
        const error = new Error('Too many requests, please try again later.');
        res.status(429);
        next(error);
    }
}));
router.use(slowDown({
    windowMs: (process.env.RATE_LIMIT_SEC || 30) * 1000, // 15 minutes
    delayAfter: 1, // allow 100 requests per 15 minutes, then...
    delayMs: 500 // begin adding 500ms of delay per request above 100:
    // request # 101 is delayed by  500ms
    // request # 102 is delayed by 1000ms
    // request # 103 is delayed by 1500ms
    // etc.
}));

module.exports = router;
