const mongoose = require('mongoose');
var validator = require('validator');

const schema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    background: {
        type: String,
        required: true,
        validate: {
            validator: value => validator.isURL(value, { protocols: ['http','https'], require_tld: true, require_protocol: true }),
            message: 'Must be a Valid URL'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    lang: {
        type: String,
        default: process.env.DEFAULT_LANG
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project',schema);
