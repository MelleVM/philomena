const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    specialty: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    workDayPart: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    status: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;