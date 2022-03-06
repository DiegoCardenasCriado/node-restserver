

const isAdminRole = ( req, res, next ) => {

    if ( !req.user ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });        
    }
    const { role, name } = req.user;

    if ( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ name } no tiene permitido está acción - no es administrador`
        });
        
    }

    next();
}

const tieneRole = ( ...roles ) => {

    return ( req, res, next  ) => {

        if ( !req.user ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });        
        }
        
        if ( !roles.includes( req.user.role ) ) {
            return res.status(401).json({
                msg: `Para realizar esta acción tienes que tener alguno de los siguientes roles: ${ roles }`
            });
        }

        next();
    }
}

module.exports = {
    isAdminRole,
    tieneRole
}