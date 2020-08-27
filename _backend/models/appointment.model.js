const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    date: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    fullDate: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    fullDateEnd: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    timeFrom: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    timeTo: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    productId: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    userId: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
}, {
    timestamps: true,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;