const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: false,
        trim: true,
    },
    male: {
        type: String,
        required: false,
        trim: true,
    },
    phone: {
        type: String,
        required: false,
        trim: true,
    },
    email: {
        type: String,
        required: false,
        trim: true,
    },
    skills: {
        type: String,
        required: false,
        trim: true,
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;