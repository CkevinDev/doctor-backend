const Usuario = require("../models/usuario")
const {response, request} = require('express')
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt");

//CONSULTAR LA LISTA DE USUARIOS
const getUsuarios = async (req = request, res= response) => {

    const desde = Number(req.query.desde) || 0;

    const [usuario,total] = await Promise.all([
        Usuario
        .find({},'nombre apellido email img role google')
        .skip(desde)
        .limit(8),

        Usuario.countDocuments()
    ])

    res.json({
        ok:true,
        usuario,
        total
    })
}

//CREAR UN NUEVO USUARIO
const crearUsuarios = async (req, res = response) => {

    const {email, password} = req.body

    try {

        //verificar si el email existe
        const emailExist = await Usuario.findOne({email})

        if (emailExist) {
            return res.status(400).json({
                ok: false,
                sms: 'El email ya esta registrado'
            })
        }

        const usuario = new Usuario(req.body);

        //Encriptado de contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt)

        //guardando usuario
        await usuario.save();

        const token = await generarJWT(usuario.id)

        res.json({
            ok:true,
            usuario,
            token
        })
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            sms: "error inesperado..."
        })
    }


}

//ACTUALIZAR USUARIO
const actualizarUsuarios = async (req = request, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msm: "No existe un usuario con ese id"
            })
        }

        //Actualizacion del usuario
        const { email,password,google , ...campos} = req.body;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos,{new:true})

        res.json({
            ok:true,
            usuario: usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            sms: 'Error inesperado al actualizar'
        })
    }

}

//DELETE USUARIO
const eliminarUsuario = async (req = request, res = response) => {
    
    const uid = req.params.id;

    try {

        //Comprobamos que el usuario exista
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                sms: 'No existe existe un usuario con este id'
            })
        }

        await Usuario.findByIdAndDelete(uid)

        res.json({
            ok:true,
            sms: 'usuario eliminado correctamente'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            sms: 'Error al eliminar el usuario'
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuarios,
    eliminarUsuario
}