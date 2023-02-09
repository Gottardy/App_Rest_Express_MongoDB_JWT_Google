const { Router } = require('express');
const {check} = require('express-validator');
const {loginAuth} = require('../controllers/authController');
const { validarParametros } = require('../middlewares/validarCampos');

const router = Router();

router.post('/login', [
    check('correo','El correo es obligatorio').isEmail(),
    check('password','El password es obligatorio').notEmpty(),
    validarParametros
], loginAuth );

module.exports = router;