const { Router } = require('express');
const { check } = require('express-validator');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { isAdminRole, tieneRole } = require('../middlewares/validar-roles');

const { validarCampos, validarJWT, isAdminRole, tieneRole } = require('../middlewares');

const { existEmail, existRole, existUserById } = require('../helpers/db-validators');

const { userGet, 
    userPost, 
    userPut, 
    userPatch, 
    userDelete } = require('../controllers/user.controller');

const router = Router();
// GET ALL USER
router.get('/', userGet);
// POST USER
router.post('/', [
    check('name', 'Name is required.').not().isEmpty(),
    check('email', 'The e-mail is not valid.').isEmail(),
    check('email').custom( existEmail ),
    check('password', 'The password must have a minimum of 6 characters.').isLength( { min: 6 } ),
    // check('role', 'The role is not valid.').isIn( ['ADMIN_ROLE', 'USER_ROLE'] ),
    check('role').custom( existRole ),
    validarCampos
],userPost);
// PUT USER
router.put('/:id', [
    check('id', 'The ID is not valid.').isMongoId(),
    check('id').custom( existUserById ),
    check('role').custom( existRole ),
    validarCampos
],userPut);
// PATCH USER
router.patch('/', userPatch);
// DELETE USER
router.delete('/:id', [
    validarJWT,
    // isAdminRole,
    tieneRole( 'ADMIN_ROLE', 'VENTAS_ROLE' ),
    check('id', 'The ID is not valid.').isMongoId(),
    check('id').custom( existUserById ),
    validarCampos
],userDelete);

module.exports = router;