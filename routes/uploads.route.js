const { Router } = require('express');
const { check } = require('express-validator');
const { uploadPost, uploadPutCloudinary, uploadGetById } = require('../controllers/uploads.controller');
const { allowedColections } = require('../helpers');

const { validateFileUpload, validarCampos } = require('../middlewares');

const router = Router();

router.get('/:collection/:id', [
    check('id', 'The ID is no valid').isMongoId(),
    validarCampos,
    check('collection').custom( c => allowedColections( c, ['users', 'products'] ) ),
    validarCampos
], uploadGetById);

router.post('/',[ 
    validateFileUpload,
    validarCampos
], uploadPost );

// router.put('/:collection/:id',[ 
//     validateFileUpload,
//     check('id', 'The ID is no valid').isMongoId(),
//     validarCampos,
//     check('collection').custom( c => allowedColections( c, ['users', 'products'] ) ),
//     validarCampos
// ], uploadPut );

router.put('/:collection/:id',[ 
    validateFileUpload,
    check('id', 'The ID is no valid').isMongoId(),
    validarCampos,
    check('collection').custom( c => allowedColections( c, ['users', 'products'] ) ),
    validarCampos
], uploadPutCloudinary );


module.exports = router;