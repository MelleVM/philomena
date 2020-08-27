const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    price: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    type: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    category: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    length: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;