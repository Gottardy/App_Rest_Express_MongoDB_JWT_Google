

const validarJWT = require('../middlewares/validarAcceso-JWT');
const validarParametros = require('../middlewares/validarCampos');
const validarRoles = require('../middlewares/validarRol');

module.exports={
    ...validarJWT,
    ...validarParametros,
    ...validarRoles,
}