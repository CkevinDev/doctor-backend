/*
    path: '/api/hospitales'
*/

const {Router} = require('express');
const { check } = require('express-validator');
const { getHospitales, crearHospitales, actualizarHospitales, deleteHospitales } = require('../controllers/hospital');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//LISTAR HOSPITALES
router.get('/',validarJWT, getHospitales)
//CREAR HOSPITALES
router.post(
    '/',
    [
        validarJWT,
        check('nombre','El nombre es obligatorio').notEmpty(),
        check('direccion','la direccion es requerida').notEmpty(),
        validarCampos
    ],
    crearHospitales
)
//ACTUALIZAR HOSPITALES
router.put(
    '/:id' ,
    [

    ] ,
    actualizarHospitales
)
//ELIMINAR HOSPITALES
router.delete('/:id',deleteHospitales)




module.exports= router;