const {Router} = require('express');
const { subirArchivo, retornarImagen } = require('../controllers/upload');
const { validarJWT } = require('../middlewares/validar-jwt');
const fileUpload = require('express-fileupload')

const router = Router();
router.use(fileUpload());


router.put('/:tipo/:id',validarJWT,subirArchivo)
router.get('/:tipo/:foto',validarJWT,retornarImagen)

module.exports=router