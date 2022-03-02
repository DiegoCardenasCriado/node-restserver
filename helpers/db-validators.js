const Role = require('../models/role');
const User = require('../models/user');

const existEmail = async( email = '') =>{
    const isEmail = await User.findOne({ email });
    if ( isEmail ) {
        throw new Error(`The e-mail '${email}' is not valid, Try another e-mail.`);
    }
}

const existRole = async(role = '') =>{
    const isRole = await Role.findOne({ role });
    if ( !isRole ) {
            throw new Error(`The role '${role}' is not valid.`);
    }
}

const existUserById = async( id ) =>{
    const existUser = await User.findById(id);
    if ( !existUser ) {
        throw new Error(`The ID: '${id}' is not valid, Try another ID.`);
    }
}

module.exports = {
    existEmail,
    existRole,
    existUserById
}