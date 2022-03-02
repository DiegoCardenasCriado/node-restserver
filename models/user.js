const { Schema, model } = require('mongoose');

const userSchema = Schema({

    name: {
        type: String,
        required: [true, 'The name is equired']
    },

    email: {
        type: String,
        required: [true, 'The email is equired'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is equired']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: [true, 'The role is equired'],
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

});

module.exports = model( 'user', userSchema );