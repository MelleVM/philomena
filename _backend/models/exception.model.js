const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExceptionSchema = new Schema({
    dateFrom: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    dateTo: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

const Exception = mongoose.model('Exception', ExceptionSchema);

module.exports = Exception;