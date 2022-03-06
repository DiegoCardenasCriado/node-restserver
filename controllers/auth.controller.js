const { response } = require("express")
const bcryptjs = require("bcryptjs");
const User = require('../models/user');
const { generarJWT } = require("../helpers/generar-jwt");

const postLogin = async( req, res=response ) => {

    const { email, password } = req.body;

    // Verificar si el usuario con ese correo existe
    const user = await User.findOne({ email });
    if ( !user ) {
        return res.status(400).json({
            msg: "The username or password is incorrect. Please verify your credentials. - email"
        });
    }

    // verificar si el usuario está activo
    if ( !user.state ) {
        return res.status(400).json({
            msg: "The username or password is incorrect. Please verify your credentials. - state"
        });
    }

    // Verificar contraseña
    const validPassword = bcryptjs.compareSync( password, user.password );
    if ( !validPassword ) {
        return res.status(400).json({
            msg: "The username or password is incorrect. Please verify your credentials. - password"
        });
    }

    // Generar JWT
    const token = await generarJWT( user.id );

    res.json({
        msg: 'POST - LOGIN',
        user,
        token
    })

}

module.exports = {
    postLogin
}