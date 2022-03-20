const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    img: {
        type: String
    },
    description: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }

});

ProductSchema.methods.toJSON = function() {
    const { __v, state, ...product } = this.toObject();
    // user.uid = _id;
    return product;
}

module.exports = model( 'Product', ProductSchema );