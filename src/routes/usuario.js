/*
    Ruta: /api/usuarios
*/
const {Router} = require('express');
const { check } = require('express-validator')
const { getUsuarios, crearUsuarios, actualizarUsuarios, eliminarUsuario } = require('../controllers/usuario');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//LISTAR USUARIOS
router.get('/' ,validarJWT, getUsuarios)
//CREAR USUARIOS
router.post(
    '/',
    [
        check('nombre','El nombre es requerido').notEmpty(),
        check('email','El  email es requerido').isEmail(),
        check('password','El password es requerido').notEmpty()
        .isLength({min:6})
        .withMessage('la contraseña debe tener mas de 6 caracteres')
        .matches(/\d/)
        .withMessage('la contraseña debe tener minimo un numero'),
        validarCampos,
    ],
    crearUsuarios
)
//ACTUALIZAR USUARIOS
router.put(
    '/:id' ,
    [
        validarJWT,
        check('nombre','El nombre es requerido').notEmpty(),
        check('apellido','El apellido es requerido').notEmpty(),
        check('email','El  email es requerido').isEmail(),
        validarCampos,
    ] ,
    actualizarUsuarios
)
//ELIMINAR USUARIOS
router.delete('/:id',validarJWT,eliminarUsuario)




module.exports= router;