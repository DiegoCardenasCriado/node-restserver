const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, isAdminRole } = require('../middlewares');
const { productGet,
        productGetById,
        productPost,
        productPut,
        productDelete } = require('../controllers/product.controller');
const { existCategoryById, existProductById } = require('../helpers/db-validators');

const router = Router();

// GET ALL PROUCTS
router.get('/', productGet);
// GET PROUCT BY ID
router.get('/:id', [
    check('id', 'The ID is no valid').isMongoId(),
    validarCampos,
    check('id').custom( existProductById ),
    validarCampos
], productGetById );
// SAVE(POST) PROUCT
router.post('/', [
    validarJWT,
    check('name', 'The name is required.').not().isEmpty(),
    check('category', 'The ID is no valid').isMongoId(),
    validarCampos,
    check('category').custom( existCategoryById ),
    validarCampos
], productPost);
// UPDATE(PUT) PROUCT
router.put('/:id', [
    validarJWT,
    check('id', 'The ID is no valid').isMongoId(),
    validarCampos,
    check('id').custom( existProductById ),
    validarCampos
], productPut );
// DELETE PROUCT
router.delete('/:id', [
    validarJWT,
    isAdminRole,
    check('id', 'The ID is no valid').isMongoId(),
    validarCampos,
    check('id').custom( existProductById ),
    validarCampos
], productDelete );

module.exports = router;