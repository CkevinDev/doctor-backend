const {response, request} = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario')
const { generarJWT } = require('../helpers/jwt')
const { googleverify } = require('../helpers/google-verify')

const login = async (req= request,res = response) => {

    const {email,password} = req.body

    try {

        const usuarioDB = await Usuario.findOne({email});

        if (!usuarioDB) {
            return res.status(404).json({
                ok:false,
                sms: 'correo o password incorrecto'
            })
        }


        const validPassword = bcrypt.compareSync(password,usuarioDB.password);

        if(!validPassword){
            return res.status(404).json({
                ok:false,
                sms: 'correo o password incorrecto'
            })
        }

        const token = await generarJWT(usuarioDB.id)

        res.json({
            ok:true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            sms: 'error de login'
        })
    }
}

const googleSignIn = async(req = request, res= response) => {
    
    const googletoken = req.body.token

    try {

        const {name,email,picture} = await googleverify(googletoken)

        const usuarioDB = await Usuario.findOne({email});

        let usuario;

        if(!usuarioDB){
            usuario = new Usuario({
                nombre: name,
                email,
                password:'@@@@@@1',
                img:picture,
                google:true
            })
        }else{
            //usuario existente
            usuario = usuarioDB;
            usuario.google = true; 
        }


        //Guardar en BD

        await usuario.save();

        const token = await generarJWT(usuario.id)

        res.json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok:false,
            sms:"token incorrecto"
        })
    }
    
}

module.exports = {
    login,
    googleSignIn
}