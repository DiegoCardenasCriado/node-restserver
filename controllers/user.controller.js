const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const userGet = async(req, res) => {

    const { limit=5, skip } = req.query
    const query = { state:true };
    // const users = await User.find(query)
    //     .skip( Number( skip ) )
    //     .limit( Number( limit ) );
    // const total = await User.countDocuments(query);
    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip( Number( skip ) )
        .limit( Number( limit ) )
    ])
    res.json({
        msg: 'GET API - CONTROLLER',
        total, 
        users
    });
}

const userPost = async(req, res) => {

    const { name, email, password, role } = req.body;
    const user = new User( {name, email, password, role} );

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // Guardar el usuario
    await user.save();
    res.json({
        msg: 'POST API - - CONTROLLER',
        user
    });
}

const userPut = async(req, res) => {

    const { id } = req.params;
    const { _id, password, email, google, ...user } = req.body;

    // Validar contra base de datos
    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync( password, salt );
    }

    const userUpdate = await User.findByIdAndUpdate( id, user ); 
    res.json({
        msg: 'PUT API - - CONTROLLER',
        userUpdate
    });
}

const userPatch = (req, res) => {
    res.json({
        msg: 'PATCH API - - CONTROLLER'
    })
}

const userDelete = async(req, res) => {

    const { id } = req.params;

    // Eliminamos el registro permanente
    // const userDelete = User.findByIdAndDelete(id);

    // Deshabilitamos el usuario
    const userDelete = await User.findByIdAndUpdate( id, { state: false } );
    res.json({
        msg: 'DELETE API - CONTROLLER',
        userDelete
    });
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userPatch,
    userDelete
}