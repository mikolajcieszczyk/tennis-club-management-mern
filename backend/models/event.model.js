const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    coach: {
        type: String,
        required: false
    },
    start_time: {
        type: Number,
        required: true
    }, 
    end_time: {
        type: Number,
        required: true
    },
    courtNumber: {
        type: Number,
        required: true
    },
    group: {
        type: Number,
        required: false
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;