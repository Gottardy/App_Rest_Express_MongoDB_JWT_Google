const { Router } = require('express');
const {check} = require('express-validator');

const {obtenerCategorias, obtenerCategoria, actualizarCategoria,  crearCategoria, eliminarCategoria} = require('../controllers/categorysController');
const { esUnRolValido, existeCorreo, existeID, existeIdCategoria } = require('../DB/validators.db');

const { validarJWT, validarParametros, esAdminRol, tieneRol } = require('../middlewares');


const router = Router();

// Obtener todas las categorias - Publico
router.get('/', obtenerCategorias );

// Obtener una categoria por id - Publico
router.get('/:id', [
    check('id','No es un ID valido').isMongoId(),
    check('id').custom( existeIdCategoria ),
    validarParametros
], obtenerCategoria );

// Actualizar registro de categoria por Id - Privado - usuario con token valido
router.put('/:id',[
    validarJWT,
    check('id','No es un ID valido').isMongoId(),
    check('id').custom( existeIdCategoria ),
    check('nombre','El nombre es obligatorio y debe ser más de 3 letras').isLength({min:2}),
    tieneRol('ADMIN_ROL','VENTAS_ROL'),
    validarParametros
] ,actualizarCategoria );

// Crear una categoria - privado - usuario con token valido
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').notEmpty(),
    tieneRol('ADMIN_ROL','VENTAS_ROL'),
    validarParametros
], crearCategoria );

// Borrar una categoria por Id - privado - usuario administrador con token valido
router.delete('/:id',[
    validarJWT,
    // esAdminRol,
    tieneRol('ADMIN_ROL','VENTAS_ROL'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom( existeIdCategoria ),
    validarParametros   
], eliminarCategoria );

module.exports = router;