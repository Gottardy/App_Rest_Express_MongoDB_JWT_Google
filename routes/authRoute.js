const { Router } = require('express');
const {check} = require('express-validator');
const {loginAuth, loginGoogle} = require('../controllers/authController');
const { validarParametros } = require('../middlewares/validarCampos');

const router = Router();

router.post('/login', [
    check('correo','El correo es obligatorio').isEmail(),
    check('password','El password es obligatorio').notEmpty(),
    validarParametros
], loginAuth );

router.post('/google', [
    check('id_token','El google id_token no esta presente').notEmpty(),
    validarParametros
], loginGoogle );

module.exports = router;