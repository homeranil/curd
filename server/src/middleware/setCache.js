const express = require('express');
const router = express.Router();

const setCache = function (req, res, next) {
    // here you can define period in second, this one is 5 minutes
    const period = 60 * 5;

    // you only want to cache for GET requests
    if (req.method == 'GET') {
        res.set('Cache-control', `public, max-age=${period}`);
    }
    else {
    // for the other requests set strict no caching parameters
        res.set('Cache-control', 'no-store, no-cache, max-age=0');
    }

    // remember to call next() to pass on the request
    next();
};

// now call the new middleware function in your app

router.use(setCache);

module.exports = router;
