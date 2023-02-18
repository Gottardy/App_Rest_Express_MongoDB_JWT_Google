

const validarJWT = require('../middlewares/validarAcceso-JWT');
const validarParametros = require('../middlewares/validarCampos');
const validarRoles = require('../middlewares/validarRol');
const validarArchivoSubir = require('../middlewares/validarArchivo')

module.exports={
    ...validarJWT,
    ...validarParametros,
    ...validarRoles,
    ...validarArchivoSubir
}