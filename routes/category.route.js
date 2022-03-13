const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, isAdminRole } = require('../middlewares');
const { categoryGet,
        categoryGetById,
        categoryPost,
        categoryPut,
        categoryDelete } = require('../controllers/category.controller');
const { existCategoryById } = require('../helpers/db-validators');

const router = Router();

// GET ALL CATEGORYS
router.get('/', categoryGet);
// GET CATEGORY BY ID
router.get('/:id', [
    check('id', 'The ID is no valid').isMongoId(),
    validarCampos,
    check('id').custom( existCategoryById ),
    validarCampos
], categoryGetById );
// SAVE(POST) CATEGORY
router.post('/', [
    validarJWT,
    check('name', 'The name is required.').not().isEmpty(),
    validarCampos
], categoryPost);
// UPDATE(PUT) CATEGORY
router.put('/:id', [
    validarJWT,
    check('name', 'The name is required.').not().isEmpty(),
    check('id', 'The ID is no valid').isMongoId(),
    validarCampos,
    check('id').custom( existCategoryById ),
    validarCampos
], categoryPut );
// DELETE CATEGORY
router.delete('/:id', [
    validarJWT,
    isAdminRole,
    check('id', 'The ID is no valid').isMongoId(),
    validarCampos,
    check('id').custom( existCategoryById ),
    validarCampos
], categoryDelete );

module.exports = router;