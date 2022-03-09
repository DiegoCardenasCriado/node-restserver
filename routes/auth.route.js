const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignin } = require('../controllers/auth.controller');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
    check('email', 'The e-mail is not valid.').isEmail(),
    check('password', 'The password is not valid.').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'The Google token is required.').not().isEmpty(),
    validarCampos
], googleSignin);

module.exports = router;