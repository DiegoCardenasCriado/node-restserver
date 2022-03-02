const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existEmail, existRole, existUserById } = require('../helpers/db-validators');

const { userGet, 
    userPost, 
    userPut, 
    userPatch, 
    userDelete } = require('../controllers/user.controller');

const router = Router();

router.get('/', userGet);

router.post('/', [
    check('name', 'Name is required.').not().isEmpty(),
    check('email', 'The e-mail is not valid.').isEmail(),
    check('email').custom( existEmail ),
    check('password', 'The password must have a minimum of 6 characters.').isLength( { min: 6 } ),
    // check('role', 'The role is not valid.').isIn( ['ADMIN_ROLE', 'USER_ROLE'] ),
    check('role').custom( existRole ),
    validarCampos
],userPost);
router.put('/:id', [
    check('id', 'The ID is not valid.').isMongoId(),
    check('id').custom( existUserById ),
    check('role').custom( existRole ),
    validarCampos
],userPut);
router.patch('/', userPatch);
router.delete('/:id', [
    check('id', 'The ID is not valid.').isMongoId(),
    check('id').custom( existUserById ),
    validarCampos
],userDelete);

module.exports = router;