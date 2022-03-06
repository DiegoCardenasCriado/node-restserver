const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user');


const validarJWT = async( req = request, res=response , next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // Leemos el usuario que quiere hacer la petición
        const user = await User.findById( uid );

        // Verificamos que el usuario exista en la BD
        if ( !user ) {
            return res.status(401).json({
            msg: 'Token no válido - usario no existe en la BD'
            })
        }

        // Verificamos que el estado del usuario
        if ( !user.state ) {
            return res.status(401).json({
            msg: 'Token no válido - usario con estado : false'
            })
        }

        req.user = user;

        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido'
        })
    }

}

module.exports = {
    validarJWT
}