// import mongoose
const mongoose = require('mongoose');

// connect to mongoose
mongoose.connect(
    process.env.DB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log('Database is connected');
    })
    .catch((err) => {
        console.log({ database_error: err });
    });
