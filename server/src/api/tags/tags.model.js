const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Tag',schema);
