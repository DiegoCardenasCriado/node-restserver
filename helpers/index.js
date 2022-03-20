
const dbValidator = require('./db-validators');
const generarJWT = require('./generar-jwt');
const googleVerify = require('./google-verify');
const fileUpload = require('./fileUpload');

module.exports = {
    ...dbValidator,
    ...generarJWT,
    ...googleVerify,
    ...fileUpload,
}