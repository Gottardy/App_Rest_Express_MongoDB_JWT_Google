const { Router } = require('express');
const {check} = require('express-validator');
const { cargarArchivo, actualizarImagen } = require('../controllers/uploadsController');
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

module.exports = router;