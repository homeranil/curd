const mongoose = require('mongoose');
var validator = require('validator');

const schema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    content: { type: String, required: false },
    background: {
        type: String,
        required: true,
        validate: {
            validator: value => validator.isURL(value, { protocols: ['http','https'], require_tld: true, require_protocol: true }),
            message: 'Must be a Valid URL'
        }
    },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: Boolean,
        default: true
    },
    lang: {
        type: String,
        default: process.env.DEFAULT_LANG
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post',schema);
