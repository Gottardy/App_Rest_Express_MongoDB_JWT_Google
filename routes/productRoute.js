const { Router } = require('express');
const {check} = require('express-validator');

const {obtenerProductos, obtenerProducto, actualizarProducto,  crearProducto, eliminarProducto} = require('../controllers/productsController');
const { existeIdProducto, existeIdCategoria } = require('../DB/validators.db');

const { validarJWT, validarParametros, esAdminRol, tieneRol } = require('../middlewares');


const router = Router();

// Obtener todas las Productos - Publico
router.get('/', obtenerProductos );

// Obtener una Producto por id - Publico
router.get('/:id', [
    check('id','No es un ID valido').isMongoId(),
    check('id').custom( existeIdProducto ),
    validarParametros
], obtenerProducto );

// Actualizar registro de Producto por Id - Privado - usuario con token valido
router.put('/:id',[
    validarJWT,
    check('id','No es un ID valido').isMongoId(),
    check('id').custom( existeIdProducto ),
    tieneRol('ADMIN_ROL','VENTAS_ROL'),
    validarParametros
] ,actualizarProducto );

// Crear una Producto - privado - usuario con token valido
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('categoria','La categoria es obligatoria').notEmpty(),
    check('categoria','No es un ID valido').isMongoId(),
    check('categoria').custom( existeIdCategoria ),
    tieneRol('ADMIN_ROL','VENTAS_ROL'),
    validarParametros
], crearProducto );

// Borrar una Producto por Id - privado - usuario administrador con token valido
router.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id','No es un ID valido').isMongoId(),
    check('id').custom( existeIdProducto ),
    validarParametros   
], eliminarProducto );

module.exports = router;