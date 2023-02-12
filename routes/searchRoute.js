const { Router } = require('express');
const {check} = require('express-validator');
const {buscar} = require('../controllers/searchController');
const { validarParametros } = require('../middlewares/validarCampos');

const router = Router();

// Obtener todas los datos - Publico
router.get('/:coleccion/:termino', buscar );

module.exports = router;