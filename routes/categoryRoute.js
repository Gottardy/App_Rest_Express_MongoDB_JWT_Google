const { Router } = require('express');
const {check} = require('express-validator');

const {categorysGet, categorysPut,  crearCategoria, categorysDelete} = require('../controllers/categorysController');
const { esUnRolValido, existeCorreo, existeID } = require('../DB/validators.db');

const { validarJWT, validarParametros, esAdminRol, tieneRol } = require('../middlewares');


const router = Router();

// Obtener todas las categorias - Publico
router.get('/', categorysGet );
// Obtener una categoria por id - Publico
router.get('/:id', categorysGet );

// Actualizar registro de categoria por Id - Privado - usuario con token valido
router.put('/:id',[
    // check('id','No es un ID valido').isMongoId(),
    // check('id').custom( existeID ),
    // check('password','El password es obligatorio y debe ser más de 8 letras').isLength({min:8}),
    // check('correo','El correo enviado no es valido').isEmail(),
    // check('rol').custom( esUnRolValido ),
    // validarParametros
] ,categorysPut );

// Crear una categoria - privado - usuario con token valido
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').notEmpty(),
    tieneRol('ADMIN_ROL','VENTAS_ROL'),
    validarParametros
], crearCategoria );

// Borrar una categoria por Id - privado - usuario administrador con token valido
router.delete('/:id',[
    // validarJWT,
    // esAdminRol,
    // // tieneRol('ADMIN_ROL','VENTAS_ROL'),
    // check('id','No es un ID valido').isMongoId(),
    // check('id').custom( existeID ),
    // validarParametros   
], categorysDelete );

module.exports = router;