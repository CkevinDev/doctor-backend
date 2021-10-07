/*
    path: '/api/medicos'
*/

const {Router} = require('express');
const { check } = require('express-validator');
const { getMedicos, crearMedicos, actualizarMedicos, eliminarMedicos } = require('../controllers/medicos');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


//LISTAR MEDICOS
router.get('/', getMedicos)
//CREAR MEDICOS
router.post(
    '/',
    [
        validarJWT,
        check('nombre','El nombre es requerido').notEmpty(),
        check('hospital','El hospital_id debe ser valido').isMongoId(),
        check('apellido','El apellido es requerido').notEmpty(),
        check('email','El  email es requerido').isEmail(),
        check('password','El password es requerido').notEmpty()
        .isLength({min:6})
        .withMessage('la contraseña debe tener mas de 6 caracteres')
        .matches(/\d/)
        .withMessage('la contraseña debe tener minimo un numero'),
        check('cmp','El  cmp es requerido').notEmpty(),
        check('especialidad','La especialidad es requerida').notEmpty(),
        validarCampos,
    ],
    crearMedicos
)
//ACTUALIZAR MEDICOS
router.put(
    '/:id' ,
    [

    ] ,
    actualizarMedicos
)
//ELIMINAR MEDICOS
router.delete('/:id',eliminarMedicos)


module.exports=router