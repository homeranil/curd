// load express to app
const express = require('express');
const app = express();

// load env file
require('dotenv').config();

if(!process.env.command){
// connect to DB
    require('./plugins/db');
}

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);

// import and use all middleware
const midllewares = require('./middleware');
app.use (midllewares);

const apiKeys = require('./middleware/apiKey');
app.use (apiKeys);

// import and use routes
const routers = require('./routes');
app.use(routers);

// Errors Handelr
app.use((req, res, next) => {
    res.status(404);
    const error = new Error(`Not Found - ${  req.originalUrl}`);
    next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    // console.log(err);
    res.status(res.statusCode || 500);
    res.json({
        error: true,
        message: err.message
    });
});
module.exports = app;
