
const bcryptjs = require("bcryptjs");
const User = require('../models/user');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleverify } = require("../helpers/google-verify");

const login = async( req, res) => {

    const { email, password } = req.body;

    // Verificar si el usuario con ese correo existe
    const user = await User.findOne({ email });
    if ( !user ) {
        return res.status(400).json({
            msg: "The username or password is incorrect. Please verify your credentials."
        });
    }

    // verificar si el usuario está activo
    if ( !user.state ) {
        return res.status(400).json({
            msg: "The username or password is incorrect. Please verify your credentials."
        });
    }

    // Verificar contraseña
    const validPassword = bcryptjs.compareSync( password, user.password );
    if ( !validPassword ) {
        return res.status(400).json({
            msg: "The username or password is incorrect. Please verify your credentials."
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

const googleSignin = async( req, res ) => {

    const { id_token } = req.body;
    
    try {

        const { name, img, email } = await googleverify( id_token );

        let user = await User.findOne({ email });

        if ( !user ) {

            // Creamos el usuario
            const data = {
                name,
                img,
                email,
                password: ':p',
                google: true
            };

            user = new User( data );
            await user.save();
            
        }

        if ( !user.state ) {
            return res.status(401).json({
                msg: 'User blocked. for more information, contact the administrador.'
            });   
        }

        // Generar JWT
        const token = await generarJWT( user.id );

        res.json({
            msg: 'Ok - Google sign in',
            token,
            user
        });

    } catch (error) {
        res.status(400).json({
            msg: 'Invalid Google token.'
        });
    }

}

module.exports = {
    login,
    googleSignin
}