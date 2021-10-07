/*
 path:  /api/login
*/

const {Router} = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//LOGIN DE USUARIO
router.post(
    '/',
    [
        check('email','El  email es requerido').isEmail(),
        check('password','El password es requerido').notEmpty(),
        validarCampos
     ],
    login
)

//LOGIN CON GOOGLE
router.post(
    '/google',
    [
        check('token','El token de google es requerido').notEmpty(),
        validarCampos
     ],
    googleSignIn
)

module.exports= router