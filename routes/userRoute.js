const { Router } = require('express');
const {check} = require('express-validator');

const {usersGet, usersPut,  usersPost, usersDelete} = require('../controllers/usersController');
const { esUnRolValido, existeCorreo, existeID } = require('../DB/validators.db');

// const { validarJWT } = require('../middlewares/validarAcceso-JWT');
// const { validarParametros } = require('../middlewares/validarCampos');
// const { esAdminRol, tieneRol } = require('../middlewares/validarRol');
const { validarJWT, validarParametros, esAdminRol, tieneRol } = require('../middlewares');


const router = Router();

router.get('/', usersGet );

router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom( existeID ),
    check('password','El password es obligatorio y debe ser más de 8 letras').isLength({min:8}),
    check('correo','El correo enviado no es valido').isEmail(),
    check('rol').custom( esUnRolValido ),
    validarParametros
] ,usersPut );

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio y debe ser más de 8 letras').isLength({min:8}),
    check('correo','El correo enviado no es valido').isEmail(),
    check('correo').custom( existeCorreo ),
    check('rol').custom( esUnRolValido ),
    validarParametros
], usersPost );

router.delete('/:id',[
    validarJWT,
    esAdminRol,
    // tieneRol('ADMIN_ROL','VENTAS_ROL'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom( existeID ),
    validarParametros   
], usersDelete );

module.exports = router;