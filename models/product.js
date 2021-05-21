const mongoose = require('mongoose');

const schema = mongoose.Schema;

const productSchema = new schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [1, "price can't be less than 1"]
    },
    desc: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "quantity can't be less than 1"]
    },
    mobile: {
        type: String,
        required: true
    }

}
    , { timestamps: true }
);

module.exports = mongoose.model('product', productSchema);