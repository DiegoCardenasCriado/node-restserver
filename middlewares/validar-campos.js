const { validationResult } = require("express-validator");

// Validar campos obligatorios
const validarCampos = ( req, res, next ) => {

    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        //Mostrar errores
        return res.status(400).json(errors);
    }

    next();
}

module.exports = {
    validarCampos
}