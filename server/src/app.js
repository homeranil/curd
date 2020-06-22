const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

require('dotenv').config();

const app = express();

const middleware = require('./auth/auth.middlewares');
const lang = require('./middleware/lang');
const requestImage = require('./middleware/requestImage');
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

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use(middleware.checkTokenSetUser);
app.use(lang.defaultLang);

app.use('/uploads', requestImage(), express.static(path.join(__dirname, './uploads/')));

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
