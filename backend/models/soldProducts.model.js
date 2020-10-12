const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    product_name: {
        type: String,
        required: false
    },
    product_photo: {
        type: String,
        required: false
    },
    product_type: {
        type: String,
        required: false
    },
    product_description: {
        type: String,
        required: false
    },
    product_condition: {
        type: String,
        required: false
    },
    product_price: {
        type: Number,
        required: false
    },
}, {
    timestamps: true
});

const Products = mongoose.model('Products', productsSchema);
module.exports = Products;