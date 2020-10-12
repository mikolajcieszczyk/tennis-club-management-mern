const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: {
        type: String,
        unique: false,
        required: false,
        trim: true,
    },
    surname: {
        type: String,
        unique: false,
        required: false,
        trim: true,
    },
    type: {
        type: String,
        unique: false,
        required: false,
        trim: true,
    },
    male: {
        type: String,
        unique: false,
        required: false,
        trim: true,
    },
    phone: {
        type: String,
        unique: false,
        required: false,
        trim: true,
    },
    email: {
        type: String,
        unique: false,
        required: false,
        trim: true,
    },
    account_number: {
        type: String,
        unique: false,
        required: false,
        trim: true,
    },
}, {
    timestamps: true
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;