const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    username: {type: String, unique: true, required: [true, 'can\'t be blank'], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    email: {type: String, lowercase: true, unique: true, required: [true, 'can\'t be blank'], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('User',schema);
