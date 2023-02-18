const { Router } = require('express');
const {check} = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImagen } = require('../controllers/uploadsController');
const { coleccionesPermitidas } = require('../DB/validators.db');

const { validarParametros } = require('../middlewares/validarCampos');
const {validarArchivoSubir} = require('../middlewares/validarArchivo')

const router = Router();

router.post('/',[validarArchivoSubir], cargarArchivo);

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','No es un ID valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c,['usuarios','productos']) ),
    validarParametros
], actualizarImagen);

router.get('/:coleccion/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c,['usuarios','productos']) ),
    validarParametros
], mostrarImagen);

module.exports = router;