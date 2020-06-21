const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

const middleware = require('./auth/auth.middlewares');
const lang = require('./middleware/lang');
const routes = require('./routes');


mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('Database is connected');
}).catch((err) => {
    console.log({ database_error: err });
});


app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(helmet());
app.use(middleware.checkTokenSetUser);
app.use(lang.defaultLang);

app.use(routes);


function notFound(req, res, next) {
    res.status(404);
    const error = new Error(`Not Found - ${  req.originalUrl}`);
    next(error);
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
        error: true,
        message: err.message
    });
}

app.use(notFound);
app.use(errorHandler);

module.exports = app;
