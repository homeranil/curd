// load express to app
const express = require('express');
const app = express();

// load env file
require('dotenv').config();

if(!process.env.command){
// connect to DB
    require('./plugins/db');
}

// import and use all middleware
const midllewares = require('./middleware');
app.use (midllewares);

// import and use routes
const routers = require('./routes');
app.use(routers);

// Errors Handelr
app.use((req, res, next) => {
    res.status(404);
    const error = new Error(`Not Found - ${  req.originalUrl}`);
    next(error);
});
app.use((err, req, res, next) => {
    res.status(res.statusCode || 500);
    res.json({
        error: true,
        message: err.message
    });
});
module.exports = app;
